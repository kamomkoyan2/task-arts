import { Request, Response, NextFunction } from 'express';

import helpers from '../helpers/Helper';

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(' ')[1];

    if (token === null) {
      return res
        .status(401)
        .send(helpers.ResponseData(401, 'Unautorized', null, null));
    }
    const result = helpers.extractToken(token!);
    if (!result) {
      return res
        .status(401)
        .send(helpers.ResponseData(401, 'Unautorized', null, null));
    }

    res.locals.userEmail = result?.email;
    next();
  } catch (error: any) {
    return res.status(500).send(helpers.ResponseData(500, '', error, null));
  }
};

export default { authenticated };
