import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { UserDoc, UserType } from '../types/user.types';
import { Types } from 'mongoose';
import { errors, helpers } from '../util';
import { UserRoles, CustomRequest } from '../types/common.types';
import { generateTokens } from '../util/helpers';
const { generatePasswordHash } = helpers;
const ObjectId = Types.ObjectId;

/**
 * User find by token
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const find = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const id = ObjectId(req.user.id);
  try {
    const user: UserDoc | null = await User.findOne({
      _id: id,
      inactive: { $ne: true },
    }).select('id name email');

    if (!user) {
      return res.status(404).json(errors.userNotFound);
    }

    return res.status(200).json(user);
  } catch (error) {
    next();
  }
};

/**
 * User administrator create
 *
 * @param {CustomRequest<UserType>} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const saveAdministrator = async (
  req: CustomRequest<UserType>,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const user = await save({
      role: UserRoles.ADMIN,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json(
      generateTokens({
        id: user?.id,
        role: user?.role,
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * User create
 *
 * @param {CustomRequest<UserType>} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const saveUser = async (
  req: CustomRequest<UserType>,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const user = await save({
      role: UserRoles.USER,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json(
      generateTokens({
        id: user?.id,
        role: user?.role,
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * User create
 *
 * @param {UserType} user
 * @return {*}  {(Promise<UserDoc | undefined>)}
 */
const save = async (user: UserType): Promise<UserDoc> => {
  return await User.create({
    name: user.name,
    email: user.email,
    password: generatePasswordHash(user.password),
    role: user.role,
  });
};

/**
 * User update information
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const id = ObjectId(req.user.id);

  const updateUser: UserType = req.body;

  if (updateUser.password) {
    updateUser.password = generatePasswordHash(updateUser.password);
  }

  try {
    const user: UserDoc | null = await User.findOneAndUpdate(
      {
        _id: id,
        inactive: {
          $ne: true,
        },
      },
      updateUser,
      {
        new: true,
      }
    ).select('id name email');

    if (!user) {
      return res.status(404).json(errors.userNotFound);
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/**
 * User logical exclusion
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
    const id = ObjectId(req.user.id);
    const user: UserDoc | null = await User.findOneAndUpdate(
      {
        _id: id,
        inactive: { $ne: true },
      },
      {
        inactive: true,
      }
    );

    if (!user) {
      return res.status(404).json(errors.userNotFound);
    }

    return res.status(200).json('Usuário removido.');
  } catch (error) {
    next(error);
  }
};

export { find, saveAdministrator, saveUser, update, remove };
