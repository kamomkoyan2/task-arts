import { Request, Response } from 'express';

import User from '../../db/models/User';
import helpers from '../../helpers/Helper';
const { ResponseData, generateToken } = helpers;
import mailer from '../../mail/mailer';
import jwt from 'jsonwebtoken';

const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.query;

  try {
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // @ts-ignore
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      throw new Error();
    }

    user.verified = true;
    await user.save();
    return res
      .status(200)
      .send(helpers.ResponseData(200, 'Email was verified', null, ''));
  } catch (error) {
    return res.status(400).send(helpers.ResponseData(400, '', error, null));
  }
};

export default { verifyEmail };
