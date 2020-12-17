import express from 'express';
import { find, save, list, voteMovie } from '../controllers/movie.controller';
import { isAdministrator, isUser } from '../middlewares/auth.middleware';

import { movieValidator } from '../validators';

const router = express.Router();

router.post('/', isAdministrator, movieValidator.movieSaveValidator, save);
router.get('/list', list);
router.post('/:id/vote', isUser, movieValidator.movieVoteValidator, voteMovie);
router.get('/:id', movieValidator.movieFindValidator, find);

export default router;
