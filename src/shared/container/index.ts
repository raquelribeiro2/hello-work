import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';
import AttendancesRepository from '@modules/attendances/infra/typeorm/repositories/AttendancesRepository';
import IGroupsRepository from '@modules/permissions/repositories/IGroupsRepository';
import GroupsRepository from '@modules/permissions/infra/typeorm/repositories/GroupsRepository';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import PermissionsRepository from '@modules/permissions/infra/typeorm/repositories/PermissionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAttendancesRepository>(
  'AttendancesRepository',
  AttendancesRepository,
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);
