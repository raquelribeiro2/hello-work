import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import { celebrate, Joi, Segments } from 'celebrate';
import AttendancesController from '../controllers/AttendancesController';

const attendancesRouter = Router();

const attendancesController = new AttendancesController();

attendancesRouter.post(
  '/attendance',
  ensureAuthenticated,
  attendancesController.create,
);

attendancesRouter.get(
  '/attendances',
  celebrate({
    [Segments.QUERY]: {
      fromDay: Joi.date().empty(null),
      toDay: Joi.date().empty(null),
      offset: Joi.number().empty(''),
      limit: Joi.number().empty(''),
    },
  }),
  ensureAuthenticated,
  attendancesController.index,
);

attendancesRouter.put(
  '/attendance/:attendance_id',
  celebrate({
    [Segments.PARAMS]: {
      attendance_id: Joi.string().uuid().required(),
    },

    [Segments.BODY]: {
      employee_id: Joi.string().uuid().empty(null),
      date: Joi.date().empty(null),
    },
  }),
  ensureAuthenticated,
  attendancesController.update,
);

attendancesRouter.delete(
  '/attendance/:attendance_id',
  celebrate({
    [Segments.PARAMS]: {
      attendance_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  attendancesController.delete,
);

export default attendancesRouter;
