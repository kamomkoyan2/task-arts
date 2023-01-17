import { Request, Response, NextFunction } from 'express';
import helpers from '../helpers/Helper';

const emailVerified = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const authToken = req.headers['authorization'];
  const token = authToken && authToken.split(' ')[1];
  const user = helpers.extractToken(token!);
  // @ts-ignore
  if (!user.verified) {
    return res
      .status(401)
      .send(helpers.ResponseData(401, 'Email not verified!', '', null));
  }
  next();
};

export default { emailVerified };
