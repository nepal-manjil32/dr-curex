import express from 'express';
import { loginUser, registerUser, logout, verifyEmail, isAuthenticated } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logout);
userRouter.post('/verify-account', userAuth, verifyEmail);
userRouter.post('/is-auth', userAuth, isAuthenticated);

export default userRouter;