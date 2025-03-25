import { Router } from 'express';
import { createDonation, getDonations } from '../controllers/donation.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJWT, createDonation);
router.get('/', authenticateJWT, getDonations);

export default router;
