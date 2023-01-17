import Validator from 'validatorjs';

import { Request, Response, NextFunction } from 'express';

import helpers from '../../helpers/Helper';
import User from '../../db/models/User';

const RegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const data = {
      email,
      password,
      confirmPassword,
    };

    const rules: Validator.Rules = {
      email: 'required|email',
      password: 'required|min:8',
      confirmPassword: 'required|same:password',
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(helpers.ResponseData(400, 'Bad Request', validate.errors, null));
    }

    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      const errorData = {
        errors: {
          email: `${data.email} already in use`,
        },
      };
      return res
        .status(400)
        .send(helpers.ResponseData(400, 'Bad Request', errorData, null));
    }

    next();
  } catch (error) {
    return res.status(500).send(helpers.ResponseData(500, '', error, null));
  }
};

export default { RegisterValidation };
