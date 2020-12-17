import { body, Meta, param } from 'express-validator';
import { validate } from '../middlewares/requestValidator.middleware';
import { errors } from '../util';
import { Types } from 'mongoose';
import { filterUpdate, checkPassword } from '../util/helpers';

const messages = errors.user.register;

export const userSignUpValidator = validate([
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

export const userRemoveValidator = validate([
  param('id', errors.invalidId)
    .notEmpty()
    .custom((value: string, { req }) => Types.ObjectId.isValid(value))
    .bail()
    .customSanitizer((value: string, meta: Meta) => Types.ObjectId(value)),
]);

export const userUpdateValidator = validate([
  body().customSanitizer((body) => filterUpdate(body)),
  body('name', messages.name)
    .optional()
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage((value: any, meta: Meta) => messages.nameLength),
  body('email', messages.email).optional().isEmail().normalizeEmail(),
  body('password', messages.password)
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 6, max: 16 })
    .withMessage((value: any, meta: Meta) => messages.passwordLength),
  body('passwordConfirmation', messages.passwordConfirmation)
    .custom(checkPassword)
    .withMessage(messages.passwordConfirmationMatch),
]);
