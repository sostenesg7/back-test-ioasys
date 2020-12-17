import userRouter from './user.router';
import authRouter from './auth.router';
import movieRouter from './movie.router';
import { Router } from 'express';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/movie', movieRouter);

export default router;
