import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import attendancesRouter from '@modules/attendances/infra/http/routes/attendances.routes';

const routes = Router();

routes.use('/', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/', attendancesRouter);

export default routes;
