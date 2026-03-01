import { Router } from 'express';
import { sendSMS, sendEmail, getNotifications } from './controller';

const router = Router();

router.post('/sms', sendSMS);
router.post('/email', sendEmail);
router.get('/:userId', getNotifications);

export default router;
