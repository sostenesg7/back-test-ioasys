import { body, Meta, param, sanitize } from 'express-validator';
import { validate } from '../middlewares/requestValidator.middleware';
import { errors } from '../util';
import { Types } from 'mongoose';

const registerMessages = errors.movie.register;
const voteMessages = errors.movie.vote;

export const movieSaveValidator = validate([
  body('title', registerMessages.title)
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage((value: any, meta: Meta) => registerMessages.titleLength),
  body('director', registerMessages.director)
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage((value: any, meta: Meta) => registerMessages.directorLength),
  body('genre', registerMessages.genre)
    .notEmpty()
    .isArray({
      min: 1,
    })
    .withMessage((value: any, meta: Meta) => registerMessages.genreLength),
  body('cast', registerMessages.cast)
    .notEmpty()
    .isArray({
      min: 1,
    })
    .withMessage((value: any, meta: Meta) => registerMessages.castLength),
]);

export const movieFindValidator = validate([
  param('id', errors.invalidId)
    .notEmpty()
    .isMongoId()
    .escape()
    .isLength({ min: 24, max: 24 })
    .bail()
    .customSanitizer((id) => Types.ObjectId(id)),
]);

export const movieVoteValidator = validate([
  param('id', errors.invalidId)
    .notEmpty()
    .notEmpty()
    .isMongoId()
    .escape()
    .isLength({ min: 24, max: 24 })
    .bail()
    .customSanitizer((id) => Types.ObjectId(id)),
  body('vote', voteMessages.vote)
    .notEmpty()
    .toInt()
    .isInt({ min: 0, max: 4 })
    .withMessage((value: any, meta: Meta) => voteMessages.voteLength),
]);
