import { Router } from 'express';
import authRoutes from './services/auth/routes';
import billingRoutes from './services/billing/routes';
import grievanceRoutes from './services/grievance/routes';
import adminRoutes from './services/admin/routes';
import notificationRoutes from './services/notification/routes';

const router = Router();

// API Gateway routes mapping to microservices
router.use('/auth', authRoutes);
router.use('/billing', billingRoutes);
router.use('/grievance', grievanceRoutes);
router.use('/admin', adminRoutes);
router.use('/notification', notificationRoutes);

export default router;
