import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';
import AttendancesRepository from '@modules/attendances/infra/typeorm/repositories/AttendancesRepository';
import IGroupsRepository from '@modules/permissions/repositories/IGroupsRepository';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import PermissionsRepository from '@modules/permissions/infra/typeorm/repositories/PermissionsRepository';
import IModulesRepository from '@modules/permissions/repositories/IModulesRepository';
import ModulesRepository from '@modules/permissions/infra/typeorm/repositories/ModulesRepository';
import IUsersGroupsRepository from '@modules/permissions/repositories/IUsersGroupsRepository';
import UsersGroupsRepository from '@modules/permissions/infra/typeorm/repositories/UsersGroupsRepository';
import GroupsRepository from '@modules/permissions/infra/typeorm/repositories/GroupsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAttendancesRepository>(
  'AttendancesRepository',
  AttendancesRepository,
);

container.registerSingleton<IModulesRepository>(
  'ModulesRepository',
  ModulesRepository,
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<IUsersGroupsRepository>(
  'UsersGroupsRepository',
  UsersGroupsRepository,
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);
