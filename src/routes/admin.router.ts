import express, { Request } from 'express';
import { body, Meta } from 'express-validator';
import { find, save, update, remove } from '../controllers/admin.controller';
import { check } from 'express-validator';
import { validate } from '../middlewares/requestValidator.middleware';
import { checkSchema } from 'express-validator';
import { errors } from '../util';
import { adminSignUpValidator, adminRemoveValidator } from '../validators';

const router = express.Router();

router.get('/:id', find);
router.post('/', adminSignUpValidator, save);
router.put('/:id', update);
router.delete('/:id', adminRemoveValidator, remove);

export default router;
