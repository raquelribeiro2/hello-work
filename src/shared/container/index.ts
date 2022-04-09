import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';
import AttendancesRepository from '@modules/attendances/infra/typeorm/repositories/AttendancesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAttendancesRepository>(
  'AttendancesRepository',
  AttendancesRepository,
);
