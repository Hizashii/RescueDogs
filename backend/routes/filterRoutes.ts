import { Router } from 'express';
import { getFilters, upsertFilter } from '../controllers/filterController';

const router = Router();
router.get('/filters', getFilters);
router.post('/filters', upsertFilter);
export default router;
