import { Request, Response } from 'express';

import PasswordHash from '../helpers/PasswordHash';
import helpers from '../helpers/Helper';
const { ResponseData, generateToken } = helpers;
import mailer from '../mail/mailer';
import User from '../db/models/User';
import Article from '../db/models/Article';

const userDetails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email: email,
      },
      include: {
        model: Article,
        attributes: ['id', 'title', 'content'],
      },
    });

    if (!user) {
      return res
        .status(404)
        .send(ResponseData(404, 'User Not Found', null, null));
    }

    user.password = '';
    user.accessToken = '';

    return res.status(200).send(ResponseData(200, 'OK', null, user));
  } catch (error) {
    return res.status(500).send(ResponseData(500, '', error, null));
  }
};

export default { userDetails };
