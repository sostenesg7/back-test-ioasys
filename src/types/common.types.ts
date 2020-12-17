import { Request } from 'express';

export interface payloadType {
  id: string;
  role: string;
}

export interface AuthType {
  token: string;
  refreshToken: string;
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface SignInType {
  email: string;
  password: string;
}

export interface CustomRequest<T> extends Request {
  body: T;
}

export interface HttpError extends Error {
  status: number;
  message: string;
  code?: number;
  keyValue?: any;
}

export interface UserRequestType {
  exp: number;
  iat: number;
  id: string;
  role: string;
}
