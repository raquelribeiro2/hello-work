import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import AttendancesController from '../controllers/AttendancesController';

const attendancesRouter = Router();

const attendancesController = new AttendancesController();

attendancesRouter.post(
  '/attendance',
  ensureAuthenticated,
  attendancesController.create,
);

export default attendancesRouter;
