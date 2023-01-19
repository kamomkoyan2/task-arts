import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

interface UserData {
  id: number | null;
  email: string | null;
  verified: boolean | null;
  active: boolean | null;
}

const generateToken = (data: any): string => {
  return jwt.sign(data, process.env.JWT_TOKEN as string, { expiresIn: '1h' });
};

const generateRefreshToken = (data: any): string => {
  return jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: '10h',
  });
};

const extractToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_TOKEN as string;

  let resData: any;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });
  if (resData) {
    return <UserData>resData;
  }
  return null;
};

const extractRefreshToken = (token: string): UserData | null => {
  const secretKey: string = process.env.JWT_REFRESH_TOKEN as string;

  let resData: any;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    return <UserData>resData;
  }
  return null;
};

const ResponseData = (
  status: number,
  message: string | null,
  error: any | null,
  data: any | null
) => {
  if (error != null && error instanceof Error) {
    return {
      status: status,
      message: error.message,
      errors: error,
      data: null,
    };
  }

  return {
    status,
    message,
    errors: error,
    data: data,
  };
};

const helpers = {
  generateToken,
  ResponseData,
  generateRefreshToken,
  extractRefreshToken,
  extractToken,
};
export default helpers;
