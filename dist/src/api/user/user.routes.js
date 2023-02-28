import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.middleware.js';
import { getUser, getUsers, updateUser } from './user.controller.js';
export const userRouter = Router();
// middleware that is specific to this router
// router.use(requireAuth)
userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.put('/:id', requireAuth, updateUser);
