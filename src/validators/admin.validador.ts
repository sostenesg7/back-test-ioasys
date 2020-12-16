import { body, Meta, param } from 'express-validator';
import { validate } from '../middlewares/requestValidator.middleware';
import { errors } from '../util';
import { Types } from 'mongoose';

const messages = errors.admin.register;

export const adminSignUpValidator = validate([
  body('name', messages.name)
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage((value: any, meta: Meta) => messages.nameLength),
  body('email', messages.email).isEmail().normalizeEmail(),
  body('password', messages.password)
    .notEmpty()
    .isString()
    .isLength({ min: 6, max: 16 })
    .withMessage((value: any, meta: Meta) => messages.passwordLength),
  body('passwordConfirmation', messages.passwordConfirmation)
    .notEmpty()
    .isString()
    .isLength({ min: 6, max: 16 })
    .withMessage(messages.passwordConfirmationLength)
    .custom((value: string, { req }) => value === req.body.password)
    .withMessage(messages.passwordConfirmationMatch),
]);

export const adminRemoveValidator = validate([
  param('id', errors.invalidId)
    .notEmpty()
    .custom((value: string, { req }) => Types.ObjectId.isValid(value))
    .bail()
    .customSanitizer((value: string, meta: Meta) => Types.ObjectId(value)),
]);
