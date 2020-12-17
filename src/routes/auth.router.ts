import express from 'express';
import { signIn } from '../controllers/auth.controller';
import { authValidator } from '../validators';

const router = express.Router();

router.post('/', authValidator.userSignInValidator, signIn);

export default router;
