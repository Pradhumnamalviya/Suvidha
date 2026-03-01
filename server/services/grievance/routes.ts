import { Router } from 'express';
import { createGrievance, trackGrievance, getGrievances, createElectricityGrievance, getElectricityGrievance } from './controller';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();

// Electricity Grievance Routes
router.post('/electricity', authenticateToken, requireRole(['CITIZEN']), createElectricityGrievance);
router.get('/electricity/:grievanceId', authenticateToken, getElectricityGrievance);

// Legacy/Other Routes
router.post('/', createGrievance);
router.get('/:trackingId', trackGrievance);
router.get('/user/:userId', getGrievances);

export default router;
