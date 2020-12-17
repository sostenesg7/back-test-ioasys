import { Document, ObjectId } from 'mongoose';

export interface FilterType {
  director?: string;
  title?: string;
  genre?: string;
  cast?: string;
}

export interface FilterQueryType {
  director?: any;
  title?: any;
  genre?: any;
  cast?: any;
}

export interface MovieType {
  id?: string;
  title: string;
  director: string;
  genre: string[];
  cast: string[];
}

export interface MovieDoc extends MovieType, Document {
  createdAt?: Date;
  updatedAt?: Date;
}
