import mongoose, { Schema } from 'mongoose';
import { AdminDoc } from '../types/admin.types';

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      description: 'Nome do administrador.',
      min: 1,
      max: 100,
      required: true,
    },
    email: {
      type: String,
      description: 'Email do administrador.',
      min: 1,
      max: 100,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      description: 'Senha do administrador.',
      min: 6,
      max: 16,
      required: true,
    },
    inactive: {
      type: Boolean,
      description: 'Status de atividade do usuário.',
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: AdminDoc, ret: AdminDoc) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Admin = mongoose.model<AdminDoc>('Admin', AdminSchema);

Admin.createCollection({});

export { Admin };
