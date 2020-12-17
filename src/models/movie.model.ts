import mongoose, { Schema, Types } from 'mongoose';
import { MovieDoc } from '../types/movie.types';

const MovieSchema = new Schema(
  {
    title: {
      type: String,
      description: 'Título do filme.',
      min: 1,
      max: 100,
      required: true,
    },
    director: {
      type: String,
      description: 'Diretor do filme.',
      min: 1,
      max: 100,
      required: true,
    },
    genre: [
      {
        type: String,
        description: 'Gêneros do filme.',
        min: 1,
        max: 100,
      },
    ],
    cast: [
      {
        type: String,
        description: 'Elenco do filme.',
        min: 1,
        max: 100,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: MovieDoc, ret: MovieDoc) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

interface MovieModel extends mongoose.Model<MovieDoc> {}

const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', MovieSchema);

Movie.createCollection({});

export { Movie };
