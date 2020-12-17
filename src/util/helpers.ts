import jwt, { Secret } from 'jsonwebtoken';
import { payloadType, AuthType } from '../types/common.types';
import bcrypt from 'bcrypt';
const {
  JWT_EXPIRATION_TIME,
  REFRESH_JWT_EXPIRATION_TIME,
  JWT_SECRET,
} = process.env;

const updateFields = ['name', 'email', 'password', 'passwordConfirmation'];

/**
 * Generate a user token and refreshToken by providing a payload
 *
 * @param {payloadType} payload
 */
export const generateTokens = (payload: payloadType) =>
  <AuthType>{
    token: jwt.sign(payload, JWT_SECRET as Secret, {
      expiresIn: JWT_EXPIRATION_TIME,
    }),
    refreshToken: jwt.sign(payload, JWT_SECRET as Secret, {
      expiresIn: REFRESH_JWT_EXPIRATION_TIME,
    }),
  };

/**
 * Generate a user secure password
 *
 * @param {string} password
 */
export const generatePasswordHash = (password: string) =>
  <string>bcrypt.hashSync(password, 10);

/**
 * Split a string into an array
 *
 * @param {string} value
 */
export const splitString = (value: string | undefined) =>
  typeof value === 'string' ? value.split(',').map((g) => g.trim()) : [];

/**
 * Verify if a filter value is valid
 *
 * @param {string} filter
 */
export const checkFilter = (filter: string | undefined): boolean =>
  typeof filter === 'string' && filter.length > 0;

/**
 * Filter input fields, allowing only specific fields to update
 *
 * @param {*} body
 */
export const filterUpdate = (body: any) => {
  Object.keys(body).forEach(
    (key: string, index: number) =>
      !updateFields.includes(key) && delete body[key]
  );

  return body;
};

/**
 * Verify if password confirmation is required
 *
 * @param {string} value
 * @param {*} { req }
 */
export const checkPassword = (value: string, { req }: any) =>
  !(req.body.password && value !== req.body.password);
