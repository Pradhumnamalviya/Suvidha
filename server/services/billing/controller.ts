import { Request, Response } from 'express';
import { query, pool } from '../../config/db';
import { AuthRequest } from '../../middleware/auth';
import crypto from 'crypto';

export const getElectricityBill = async (req: Request, res: Response): Promise<any> => {
  try {
    const { consumerId } = req.params;

    if (!consumerId) {
      return res.status(400).json({ error: 'Consumer ID is required' });
    }

    // Fetch bill from electricity_bills table
    const { rows } = await query(
      `SELECT * FROM electricity_bills WHERE consumer_number = $1 ORDER BY created_at DESC LIMIT 1`,
      [consumerId]
    );

    if (rows.length > 0) {
      const bill = rows[0];
      return res.json({
        success: true,
        data: {
          consumer_number: bill.consumer_number,
          amount: parseFloat(bill.amount_due),
          due_date: bill.due_date,
          billing_cycle: bill.billing_cycle,
          status: bill.status,
          previous_usage_kwh: 450, // Mock value as it's not in schema
          generated_at: bill.created_at
        }
      });
    }

    // If no bill exists, generate a mock pending bill and insert it
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 10);
    
    const amount = Math.floor(Math.random() * 2000) + 500;
    const dueDateStr = dueDate.toISOString().split('T')[0];
    const billingCycle = `${dueDate.toLocaleString('default', { month: 'short' })}-${dueDate.getFullYear()}`;
    const previousUsage = Math.floor(Math.random() * 300) + 100;
    const userId = (req as AuthRequest).user?.id || null;

    const insertResult = await query(
      `
      INSERT INTO electricity_bills
      (user_id, consumer_number, amount_due, due_date, billing_cycle, status)
      VALUES ($1, $2, $3, $4, $5, 'PENDING')
      RETURNING *
      `,
      [userId, consumerId, amount, dueDateStr, billingCycle]
    );

    const newBill = insertResult.rows[0];

    return res.json({
      success: true,
      data: {
        consumer_number: newBill.consumer_number,
        amount: parseFloat(newBill.amount_due),
        due_date: newBill.due_date,
        billing_cycle: newBill.billing_cycle,
        status: newBill.status,
        previous_usage_kwh: previousUsage,
        generated_at: newBill.created_at
      },
      message: 'Mock bill generated and saved as no existing record was found.'
    });

  } catch (error) {
    console.error('Fetch Electricity Bill Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const payElectricityBill = async (req: AuthRequest, res: Response): Promise<any> => {
  const client = await pool.connect();
  try {
    const { consumerId } = req.body;
    const userId = req.user?.id;

    if (!consumerId) {
      return res.status(400).json({ error: 'Consumer ID is required' });
    }

    await client.query('BEGIN');

    // Fetch latest bill for consumerId
    const { rows: bills } = await client.query(
      `SELECT * FROM electricity_bills WHERE consumer_number = $1 ORDER BY created_at DESC LIMIT 1 FOR UPDATE`,
      [consumerId]
    );

    if (bills.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'No bill found for this consumer ID' });
    }

    const bill = bills[0];

    if (bill.status === 'PAID') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'This bill is already paid' });
    }

    if (bill.status !== 'PENDING') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: `Bill status is ${bill.status}, cannot process payment` });
    }

    // Generate details
    const transactionId = crypto.randomUUID();
    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = `ELEC-${currentYear}-${randomSuffix}`;
    const paymentTimestamp = new Date().toISOString();
    const amount = parseFloat(bill.amount_due);

    // Update bill status
    await client.query(
      `UPDATE electricity_bills SET status = 'PAID', updated_at = NOW() WHERE id = $1`,
      [bill.id]
    );

    // Insert payment record
    await client.query(
      `INSERT INTO payments (user_id, transaction_ref, amount, payment_method, payment_status, electricity_bill_id, created_at)
       VALUES ($1, $2, $3, $4, 'SUCCESS', $5, $6)`,
      [userId, transactionId, amount, 'UPI', bill.id, paymentTimestamp]
    );

    await client.query('COMMIT');

    return res.json({
      success: true,
      data: {
        transactionId,
        receiptNumber,
        consumerId,
        amount,
        paymentTimestamp,
        department: 'Electricity',
        status: 'SUCCESS'
      }
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Electricity Bill Payment Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
};

export const getElectricityReceipt = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({ error: 'Transaction ID is required' });
    }

    const { rows } = await query(
      `SELECT 
         p.transaction_ref, 
         p.amount, 
         p.created_at as payment_timestamp, 
         p.payment_status,
         eb.consumer_number
       FROM payments p
       JOIN electricity_bills eb ON p.electricity_bill_id = eb.id
       WHERE p.transaction_ref = $1`,
      [transactionId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Receipt not found for the given transaction ID' });
    }

    const receipt = rows[0];
    
    // Generate a deterministic receipt number since it wasn't stored in the DB schema
    const year = new Date(receipt.payment_timestamp).getFullYear();
    const shortRef = receipt.transaction_ref.substring(0, 4).toUpperCase();
    const receiptNumber = `ELEC-${year}-${shortRef}`;

    return res.json({
      success: true,
      data: {
        receiptNumber,
        transactionId: receipt.transaction_ref,
        consumerId: receipt.consumer_number,
        amount: parseFloat(receipt.amount),
        paymentTimestamp: receipt.payment_timestamp,
        department: 'Electricity',
        status: receipt.payment_status
      }
    });

  } catch (error) {
    console.error('Fetch Electricity Receipt Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBills = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Mock data
    res.json([
      { id: 1, type: 'Electricity', amount: 1500, dueDate: '2026-03-15', status: 'pending' },
      { id: 2, type: 'Water', amount: 450, dueDate: '2026-03-20', status: 'pending' }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const payBill = async (req: Request, res: Response) => {
  try {
    const { billId, paymentMethod } = req.body;
    // Mock payment processing
    res.json({ message: 'Payment successful', transactionId: 'TXN123456789' });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed' });
  }
};

export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Mock history
    res.json([
      { id: 101, type: 'Electricity', amount: 1200, date: '2026-02-10', status: 'success' }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
