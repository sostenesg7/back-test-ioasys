import mongoose, { Schema } from 'mongoose';
import { VoteDoc } from '../types/vote.types';
const { ObjectId } = Schema.Types;

const VoteSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      description: 'Usuário que realizou a avaliação.',
    },
    movie: {
      type: ObjectId,
      ref: 'Movie',
      description: 'Filme avaliado.',
    },
    vote: {
      type: Number,
      description: 'Avaliação do filme pelo usuário.',
      min: 0,
      max: 4,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: VoteDoc, ret: VoteDoc) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Vote = mongoose.model<VoteDoc>('Vote', VoteSchema);

Vote.createCollection({});

export { Vote };
