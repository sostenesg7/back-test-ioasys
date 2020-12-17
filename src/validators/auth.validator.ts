import { body, Meta, param } from 'express-validator';
import { validate } from '../middlewares/requestValidator.middleware';
import { errors } from '../util';

const messages = errors.user.register;

export const userSignInValidator = validate([
  body('email', messages.email).isEmail().normalizeEmail(),
  body('password', messages.password)
    .notEmpty()
    .isString()
    .isLength({ min: 6, max: 16 })
    .withMessage((value: any, meta: Meta) => messages.passwordLength),
]);
