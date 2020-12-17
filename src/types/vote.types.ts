import { Document, ObjectId } from 'mongoose';
import { MovieDoc } from './movie.types';
import { UserDoc } from './user.types';

export interface VoteDoc extends Document {
  user: UserDoc | ObjectId | undefined;
  movie: MovieDoc | ObjectId | undefined;
  vote: number;
}
