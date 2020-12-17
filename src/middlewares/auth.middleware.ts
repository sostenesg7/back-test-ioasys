import { UserRoles } from '../types/common.types';
import { NextFunction, Response, Request } from 'express';
import { User } from '../models/user.model';
import { Types } from 'mongoose';

/**
 * Verify if current user is a single user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {*}
 */
export const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Implementar a funcionalidade que invalida o token na remoção do usuário
  /* 
   const id = Types.ObjectId(req.user.id); 
  const user = await User.findOne({ _id: id, inactive: { $ne: true } }).select(
    'id'
  ); */

  if (req.user?.role !== UserRoles.USER) {
    return res.status(403).send('Acesso negado. Faça login com uma conta de usuário comum e tente novamente.');
  }

  next();
};

/**
 * Verify if current user is a administrator
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {*}
 */
export const isAdministrator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Implementar a funcionalidade que invalida o token na remoção do usuário
  /* const id = Types.ObjectId(req.user.id);
  const user = await User.findOne({ _id: id, inactive: { $ne: true } }).select(
    'id'
  ); */

  if (req.user?.role !== UserRoles.ADMIN) {
    return res.status(403).send('Acesso negado. Faça login com uma conta de administrador e tente novamente.');
  }

  next();
};
