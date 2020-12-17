import mongoose, { Schema } from 'mongoose';
import { UserDoc } from '../types/user.types';
import { UserRoles } from '../types/common.types';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      description: 'Nome do usuário.',
      min: 1,
      max: 100,
      required: true,
    },
    email: {
      type: String,
      description: 'Email do usuário.',
      min: 1,
      max: 100,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      description: 'Senha do usuário.',
      min: 6,
      max: 16,
      required: true,
    },
    inactive: {
      type: Boolean,
      description: 'Status de atividade do usuário.',
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      description: 'Papel usuário no sistema (admin/usuário padrão).',
      default: UserRoles.USER,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: UserDoc, ret: UserDoc) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model<UserDoc>('User', UserSchema);

User.createCollection({});

export { User };
