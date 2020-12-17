import { Document } from 'mongoose';
import { UserRoles } from './common.types';

export interface UserType {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
}

export interface UserDoc extends UserType, Document {
  id: string;
  inactive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
