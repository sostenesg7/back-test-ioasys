import { Document, ObjectId } from 'mongoose';

export interface AdminDoc extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  inactive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
