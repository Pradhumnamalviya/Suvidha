import { Request, Response } from 'express';
import { query } from '../../config/db';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Mock admin stats
    res.json({
      totalUsers: 15420,
      activeGrievances: 342,
      resolvedGrievances: 12050,
      revenueCollected: 4500000
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateGrievanceStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    // Mock update
    res.json({ message: `Grievance ${id} updated to ${status}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Mock users list
    res.json([
      { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'citizen' },
      { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'admin' }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
