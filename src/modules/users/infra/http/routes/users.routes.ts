import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/user',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      document: Joi.string().required(),
      password: Joi.string().min(6).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  usersController.create,
);

export default usersRouter;
