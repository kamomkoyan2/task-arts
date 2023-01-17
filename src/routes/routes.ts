import express from 'express';


const router = express.Router();

import UserController from "../controllers/UserController";

router.post('/user/signup', UserController.Register);


export default router;