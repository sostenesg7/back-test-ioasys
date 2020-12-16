import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      errors: errors
        //.formatWith((error) => ({ message: error.msg, field: error.param }))
        .formatWith((error) => error.msg)
        .mapped(),
    });
  };
};

export { validate };
