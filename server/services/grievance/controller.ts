import { Request, Response } from 'express';
import { query } from '../../config/db';
import { AuthRequest } from '../../middleware/auth';

/**
 * Create a new Electricity Grievance
 * POST /api/v1/grievance/electricity
 */
export const createElectricityGrievance = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { consumerId, complaintType, description } = req.body;
    const userId = req.user?.id;

    if (!consumerId || !complaintType || !description) {
      return res.status(400).json({ error: 'consumerId, complaintType, and description are required' });
    }

    const validTypes = ['OUTAGE', 'METER_FAULT', 'BILLING_ISSUE'];
    if (!validTypes.includes(complaintType)) {
      return res.status(400).json({ error: 'Invalid complaintType. Must be OUTAGE, METER_FAULT, or BILLING_ISSUE' });
    }

    // Auto-generate grievance_id (format ELEC-GRV-XXXX)
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const grievanceId = `ELEC-GRV-${randomSuffix}`;

    // Insert into grievances table
    const { rows } = await query(
      `INSERT INTO grievances 
       (user_id, grievance_id, consumer_id, department, complaint_type, description, status) 
       VALUES ($1, $2, $3, 'ELECTRICITY', $4, $5, 'REGISTERED') 
       RETURNING *`,
      [userId, grievanceId, consumerId, complaintType, description]
    );

    const newGrievance = rows[0];

    return res.status(201).json({
      grievanceId: newGrievance.grievance_id,
      consumerId: newGrievance.consumer_id,
      complaintType: newGrievance.complaint_type,
      status: newGrievance.status,
      createdAt: newGrievance.created_at
    });

  } catch (error) {
    console.error('Create Electricity Grievance Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Get details of a specific Electricity Grievance
 * GET /api/v1/grievance/electricity/:grievanceId
 */
export const getElectricityGrievance = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { grievanceId } = req.params;

    if (!grievanceId) {
      return res.status(400).json({ error: 'Grievance ID is required' });
    }

    const { rows } = await query(
      `SELECT * FROM grievances WHERE grievance_id = $1 AND department = 'ELECTRICITY'`,
      [grievanceId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Grievance not found' });
    }

    const grievance = rows[0];

    return res.json({
      grievanceId: grievance.grievance_id,
      consumerId: grievance.consumer_id,
      complaintType: grievance.complaint_type,
      status: grievance.status,
      department: grievance.department,
      createdAt: grievance.created_at,
      updatedAt: grievance.updated_at
    });

  } catch (error) {
    console.error('Fetch Electricity Grievance Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Legacy/Generic Grievance Handlers
export const createGrievance = async (req: Request, res: Response) => {
  try {
    const { department, complaintType, description, consumerId } = req.body;
    const grievanceId = `GRV-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Simple mock response for generic grievances
    res.status(201).json({ message: 'Grievance lodged successfully', grievanceId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to lodge grievance' });
  }
};

export const trackGrievance = async (req: Request, res: Response) => {
  try {
    const { trackingId } = req.params;
    const { rows } = await query(
      `SELECT * FROM grievances WHERE grievance_id = $1`,
      [trackingId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Grievance not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getGrievances = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { rows } = await query(
      `SELECT * FROM grievances WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
