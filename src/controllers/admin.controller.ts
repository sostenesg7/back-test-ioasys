import { Request, Response, NextFunction } from 'express';
import { Admin } from '../models/admin.model';
import { AdminDoc } from '../types/admin.types';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;
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
  //FIXME: remover find, pois não é necessário
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
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    //TODO: Criar password

    const admin: AdminDoc = await new Admin(req.body).save();

    admin.set('password', undefined);
    admin.set('inactive', undefined);

    return res.status(200).json(admin);
  } catch (error) {
    // error.status = 422;
    next(error);
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
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    //TODO: Criar password

    const admin: AdminDoc = await new Admin(req.body).save();

    return res.status(200).json(admin);
  } catch (error) {
    error.status = 422;
    next(error);
  }
};

/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const id = ObjectId(req.params.id);
    const admin: AdminDoc | null = await Admin.findOneAndUpdate(
      {
        _id: id,
        inactive: { $ne: true },
      },
      {
        inactive: true,
      }
    );

    if (!admin) {
      return res.status(422).json('Administrador não encontrado.');
    }

    return res.status(200).json('Administrador removido.');
  } catch (error) {
    next(error);
  }
};

export { find, save, update, remove };
