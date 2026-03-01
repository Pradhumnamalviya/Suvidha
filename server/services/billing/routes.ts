import { Router } from 'express';
import { getBills, payBill, getPaymentHistory, getElectricityBill, payElectricityBill, getElectricityReceipt } from './controller';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();

// Electricity Bill Route
router.get('/electricity/:consumerId', getElectricityBill);
router.post('/electricity/pay', authenticateToken, requireRole(['CITIZEN']), payElectricityBill);
router.get('/electricity/receipt/:transactionId', authenticateToken, requireRole(['CITIZEN']), getElectricityReceipt);

// Legacy/Other Routes
router.get('/:userId', getBills);
router.post('/pay', payBill);
router.get('/history/:userId', getPaymentHistory);

export default router;
