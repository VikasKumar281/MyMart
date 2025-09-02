import express from 'express';
import { register } from '../controllers/UserController.js';
// import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register);

export default userRouter;