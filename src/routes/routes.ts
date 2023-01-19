import express from 'express';

const router = express.Router();

import AuthController from '../controllers/auth/AuthController';
import UserValidation from '../middleware/validator/UserValidation';
import ArticleController from '../controllers/ArticleController';
import authorization from '../middleware/authorization';
import verifyEmailController from '../controllers/auth/VerifyEmailController';
import emailVerified from '../middleware/emailVerified';
import UserController from '../controllers/UserController';

router.post(
  '/auth/signup',
  UserValidation.RegisterValidation,
  AuthController.Register
);
router.post('/auth/signin', AuthController.Login);

router.get('/auth/verify-email', verifyEmailController.verifyEmail);

router.get('/auth/refresh-token', AuthController.refreshToken);
router.get(
  '/user/current-user',
  authorization.authenticated,
  UserController.userDetails
);
router.get(
  '/user/logout',
  authorization.authenticated,
  AuthController.userLogout
);

router.post(
  '/create/articles',
  authorization.authenticated,
  emailVerified.emailVerified,
  ArticleController.createArticle
);

router.get(
  '/articles',
  authorization.authenticated,
  ArticleController.getAllArticles
);
router.patch(
  '/article/:id',
  authorization.authenticated,
  ArticleController.updateArticle
);
router.delete(
  '/article/:id',
  authorization.authenticated,
  ArticleController.deleteArticle
);

export default router;
