import { Router } from 'express';
import { login, signup, logout, getLoggedInUser } from './auth.controller.js';
export const authRouter = Router();
authRouter.get('/logged-in-user', getLoggedInUser);
authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.post('/logout', logout);
