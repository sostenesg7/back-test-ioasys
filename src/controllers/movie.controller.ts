import { Request, Response, NextFunction } from 'express';
import { Movie } from '../models/movie.model';
import { Vote } from '../models/vote.model';
import { MovieDoc, FilterQueryType, FilterType } from '../types/movie.types';
import { Types } from 'mongoose';
import { errors } from '../util';
import { CustomRequest } from '../types/common.types';
import { checkFilter, splitString } from '../util/helpers';
const ObjectId = Types.ObjectId;

/**
 * Movie list by director, title, genre and/or cast
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const list = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { director, title, genre, cast } = (req.query as any) as FilterType;

  const baseQuery: FilterQueryType = {};

  if (checkFilter(director)) {
    baseQuery.director = { $regex: RegExp(`${director}`), $options: 'i' };
  }

  if (checkFilter(title)) {
    baseQuery.title = { $regex: RegExp(`${title}`), $options: 'i' };
  }

  if (checkFilter(genre)) {
    const genreArray = splitString(genre);

    baseQuery.genre = {
      $in: genreArray,
    };
  }

  if (checkFilter(cast)) {
    const castArray = splitString(cast);

    baseQuery.cast = {
      $in: castArray,
    };
  }

  try {
    const movies = await Movie.find(baseQuery);

    return res.status(200).json(movies);
  } catch (error) {
    next();
  }
};

/**
 * Movie find one
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const find = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const id = ObjectId(req.params.id);

  try {
    const movie = await Movie.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: 'votes',
          let: { movieId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$movie', '$$movieId'] },
              },
            },
            {
              $project: {
                vote: true,
                _id: false,
              },
            },
          ],
          as: 'votes',
        },
      },
      {
        $addFields: {
          id: '$_id',
          average: { $avg: '$votes.vote' },
        },
      },
      {
        $project: {
          votes: false,
          _id: false,
          __v: false,
        },
      },
    ]);

    if (!movie[0]) {
      return res.status(404).json(errors.movieNotFound);
    }

    return res.status(200).json(movie[0]);
  } catch (error) {
    next();
  }
};

/**
 * User create
 *
 * @param {CustomRequest<MovieDoc>} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const save = async (
  req: CustomRequest<MovieDoc>,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { title, director, genre, cast } = req.body;
    const movie: MovieDoc = await Movie.create({
      title,
      director,
      genre,
      cast,
    });

    return res.status(202).json(movie);
  } catch (error) {
    next(error);
  }
};

/**
 * Vote by user on movie
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const voteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const userId = ObjectId(req.user.id);
    const vote = req.body.vote;
    const movieId = ObjectId(req.params.id);

    const query: any = {
      movie: movieId,
      user: userId,
    };

    const newVote = await Vote.findOneAndUpdate(
      query,
      {
        vote,
      },
      { upsert: true }
    ).select('id vote');

    return res
      .status(200)
      .json(
        newVote && newVote?.vote >= 0 ? 'Voto alterado.' : 'Voto registrado.'
      );
  } catch (error) {
    next(error);
  }
};

export { find, save, list, voteMovie };
