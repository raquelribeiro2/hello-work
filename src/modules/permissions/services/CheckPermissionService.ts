import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IModulesRepository from '../repositories/IModulesRepository';
import IPermissionsRepository from '../repositories/IPermissionsRepository';
import IUsersGroupsRepository from '../repositories/IUsersGroupsRepository';

interface IRequest {
  user_id: string;
  permission: string;
  module: string;
}

@injectable()
class CheckPermissionService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    user_id,
    permission,
    module,
  }: IRequest): Promise<void> {
    const findModule = await this.modulesRepository.findByModuleName(module);

    if (!findModule) {
      throw new AppError('Module not found', 404);
    }

    const userGroups = await this.usersGroupsRepository.findAll(user_id);

    let hasPermission = false;

    await Promise.all(
      userGroups.map(async userGroup => {
        const findPermission =
          await this.permissionsRepository.findByGroupAndModuleId(
            findModule.id,
            userGroup.group_id,
          );

        if (findPermission && findPermission[permission]) {
          hasPermission = true;
        }
      }),
    );

    if (!hasPermission) {
      throw new AppError(`You are not allowed to ${permission} ${module}`, 403);
    }
  }
}

export default CheckPermissionService;
