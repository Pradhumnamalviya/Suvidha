import { Router } from 'express';
import { sendOtp, verifyOtp, adminLogin, getMe } from './controller';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();

// Public Routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/admin/login', adminLogin);

// Protected Routes
router.get('/me', authenticateToken, getMe);

// Example of a role-protected route (Admin only)
router.get('/admin/dashboard', authenticateToken, requireRole(['SUPER_ADMIN', 'DEPT_ADMIN']), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard' });
});

export default router;
