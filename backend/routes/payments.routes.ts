import { Router } from 'express';
import { createItemSession, createDonationSession } from '../controllers/payments.controller';

const router = Router();

router.post('/create-item-session', createItemSession);
router.post('/create-donation-session', createDonationSession);

export default router; 