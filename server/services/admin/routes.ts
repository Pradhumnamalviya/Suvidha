import { Router } from 'express';
import { getDashboardStats, updateGrievanceStatus, getAllUsers } from './controller';

const router = Router();

router.get('/stats', getDashboardStats);
router.put('/grievance/:id/status', updateGrievanceStatus);
router.get('/users', getAllUsers);

export default router;
