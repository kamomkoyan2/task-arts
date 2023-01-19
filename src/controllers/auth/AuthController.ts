import { Request, Response } from 'express';

import User from '../../db/models/User';
import PasswordHash from '../../helpers/PasswordHash';
import helpers from '../../helpers/Helper';
const { ResponseData, generateToken } = helpers;
import mailer from '../../mail/mailer';
import Helper from '../../helpers/Helper';

const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, confirmPassword } = req.body;

    const hashed = await PasswordHash.PasswordHashing(password);

    const user = await User.create({
      email,
      password: hashed,
      active: false,
      verified: false,
    });

    const token = helpers.generateToken({ email: user.email });

    try {
      await mailer.sendVerificationMail(user.email, token);
      return res
        .status(201)
        .send(helpers.ResponseData(201, 'Verification email sent', null, user));
    } catch (error) {
      return res.status(500).send(helpers.ResponseData(500, '', error, null));
    }
  } catch (error: any) {
    return res.status(500).send(helpers.ResponseData(500, '', error, null));
  }
};

const Login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .send(helpers.ResponseData(401, 'Unauthorized', null, null));
    }
    const matched = await PasswordHash.PasswordCompare(password, user.password);
    if (!matched) {
      return res
        .status(401)
        .send(helpers.ResponseData(401, 'Unauthorized', null, null));
    }

    const userInfo = {
      email: user.email,
      id: user.id,
      verified: user.verified,
      active: user.active,
    };

    const token = helpers.generateToken(userInfo);
    const refreshToken = helpers.generateRefreshToken(userInfo);

    user.accessToken = refreshToken;
    await user.save();
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 100,
    });

    const responseUser = {
      ...userInfo,
      token: token,
    };

    return res
      .status(200)
      .send(helpers.ResponseData(200, 'OK', null, responseUser));
  } catch (error) {
    return res.status(500).send(helpers.ResponseData(500, '', error, null));
  }
};

const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res
        .status(400)
        .send(ResponseData(401, 'Unauthorized', null, null));
    }

    const decodedUser = Helper.extractRefreshToken(refreshToken);
    console.log(decodedUser);
    if (!decodedUser) {
      return res
        .status(400)
        .send(ResponseData(401, 'Unauthorized', null, null));
    }

    const token = helpers.generateToken({
      email: decodedUser.email,
      verified: decodedUser.verified,
      active: decodedUser.active,
    });

    const resultUser = {
      email: decodedUser.email,
      verified: decodedUser.verified,
      active: decodedUser.active,
      token: token,
    };

    return res.status(200).send(ResponseData(200, 'OK', null, resultUser));
  } catch (error) {
    return res.status(500).send(ResponseData(500, '', error, null));
  }
};

const userLogout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(200).send(ResponseData(200, 'User Logout', null, null));
    }
    const email = res.locals.userEmail;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.clearCookie('refreshToken');
      return res
        .status(200)
        .send(ResponseData(200, 'You are logged Out', null, null));
    }

    await user.update({ accessToken: null }, { where: { email: email } });
    res.clearCookie('refreshToken');
    return res
      .status(200)
      .send(ResponseData(200, 'You are logged Out', null, null));
  } catch (error) {
    return res.status(500).send(ResponseData(500, '', error, null));
  }
};

export default { Register, Login, refreshToken, userLogout };
