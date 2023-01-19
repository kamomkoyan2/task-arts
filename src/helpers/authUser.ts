import helpers from './Helper';

const isAuth = (req: any) => {
  const authToken = req.headers['authorization'];
  const token = authToken && authToken.split(' ')[1];
  return helpers.extractToken(token!);
};

export default isAuth;
