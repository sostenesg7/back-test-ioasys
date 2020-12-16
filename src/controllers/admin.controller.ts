import { Request, Response } from 'express';
import { Admin } from '../models/admin.model';
import { AdminDoc } from '../types/admin.types';

interface CustomRequest<T> extends Request {
  body: T;
}

/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const find = async (req: Request, res: Response): Promise<Response> => {
  try {
    const admin: AdminDoc | null = await Admin.findOne({});

    if (!admin) {
      return res.status(422).json('Administrador não encontrado.');
    }

    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/**
 *
 *
 * @param {CustomRequest<AdminDoc>} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const save = async (
  req: CustomRequest<AdminDoc>,
  res: Response,
  next: any
): Promise<Response> => {
  try {
    //TODO: Criar password

    const admin: AdminDoc = await new Admin(req.body).save();

    admin.set('password', undefined);
    admin.set('inactive', undefined);

    return res.status(200).json(admin);
  } catch (error) {
    error.status = 422;
    return next(error);
    //return res.status(500).json(error.message);
  }
};

/**
 *
 *
 * @param {CustomRequest<AdminDoc>} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const update = async (
  req: CustomRequest<AdminDoc>,
  res: Response
): Promise<Response> => {
  try {
    //TODO: Criar password

    const admin: AdminDoc = await new Admin(req.body).save();

    return res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { find, save, update };
