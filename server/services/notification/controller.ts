import { Request, Response } from 'express';
import { query } from '../../config/db';

export const sendSMS = async (req: Request, res: Response) => {
  try {
    const { phone, message } = req.body;
    // Mock SMS sending (e.g., via Twilio or local gateway)
    res.json({ message: 'SMS sent successfully', recipient: phone });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send SMS' });
  }
};

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { email, subject, body } = req.body;
    // Mock Email sending (e.g., via SendGrid or AWS SES)
    res.json({ message: 'Email sent successfully', recipient: email });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send Email' });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Mock user notifications
    res.json([
      { id: 1, type: 'alert', message: 'Your electricity bill is due tomorrow.', read: false },
      { id: 2, type: 'info', message: 'Grievance GRV-123456 has been resolved.', read: true }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
