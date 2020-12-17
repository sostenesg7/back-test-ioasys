import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { compareSync } from 'bcrypt';
import { User } from '../models/user.model';
import { generateTokens } from '../util/helpers';
import { errors } from '../util';
import { SignInType, CustomRequest } from '../types/common.types';

// TODO: implementar funcionalidade de obter um novo token, por meio do refreshToken

/**
 * User signIn
 *
 * @param {CustomRequest<SignInType>} req
 * @param {Response} res
 * @return {*}  {Promise<Response>}
 */
const signIn = async (
  req: CustomRequest<SignInType>,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
      email,
      inactive: {
        $ne: true,
      },
    }).select('id password role');

    if (!user || !compareSync(password, user.password)) {
      return res.status(401).json(errors.invalidCredentials);
    }

    return res.status(200).json(
      generateTokens({
        id: user.id,
        role: user.role,
      })
    );
  } catch (error) {
    next(error);
  }
};

export { signIn };
