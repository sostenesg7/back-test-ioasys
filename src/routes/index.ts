import adminRouter from './admin.router';
import { Router } from 'express';

const router = Router();

router.use('/admin', adminRouter);

export default router;
