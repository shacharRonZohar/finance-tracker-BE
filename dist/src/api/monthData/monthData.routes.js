import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.middleware.js';
import { getMonthData } from './monthData.controller.js';
export const monthDataRouter = Router();
// middleware that is specific to this router
monthDataRouter.use(requireAuth);
monthDataRouter.get('/:year', getMonthData);
// monthlyDataRoutes.get('/:id', getUser)
// monthlyDataRoutes.put('/:id',  updateUser)
