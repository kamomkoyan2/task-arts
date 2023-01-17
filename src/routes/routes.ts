import express from 'express';

const router = express.Router();

import AuthController from '../controllers/auth/AuthController';
import UserValidation from '../middleware/validator/UserValidation';
import ArticleController from '../controllers/ArticleController';
import authorization from '../middleware/authorization';
import verifyEmailController from '../controllers/auth/VerifyEmailController';
import emailVerified from '../middleware/emailVerified';

router.post(
  '/auth/signup',
  UserValidation.RegisterValidation,
  AuthController.Register
);
router.post('/auth/signin', AuthController.Login);

router.get('/auth/verify-email', verifyEmailController.verifyEmail);

router.post(
  '/create/articles',
  authorization.authenticated,
  emailVerified.emailVerified,
  ArticleController.createArticle
);

export default router;
