import express from 'express';
import {getUser, loginUser, registerUser, logout } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.get('/data',userAuth, getUser)
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout',userAuth, logout);
// userRouter.post('/verify-account', userAuth, verifyEmail);
// userRouter.post('/is-auth', userAuth, isAuthenticated);

export default userRouter;