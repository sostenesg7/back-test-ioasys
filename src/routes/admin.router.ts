import express, { Request } from 'express';
import { body, Meta } from 'express-validator';
import { find, save, update } from '../controllers/admin.controller';
import { check } from 'express-validator';
import { validate } from '../middlewares/requestValidator.middleware';
import { checkSchema } from 'express-validator';
import { errors } from '../util';
import { adminSignUpValidator } from '../validators';

const router = express.Router();

router.get('/', find);
router.post('/', adminSignUpValidator, save);
router.put('/', update);

export default router;
