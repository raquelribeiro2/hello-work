import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IGroupsRepository from '@modules/permissions/repositories/IGroupsRepository';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  is?: string;
  can?: string;
}

@injectable()
class CheckPermissionService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ user_id, is, can }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userGroups = await this.usersRepository.findUsersGroups(user.id);

    let hasPermission = false;

    await Promise.all(
      userGroups.map(async userGroup => {
        const userPermissions = await this.usersRepository.findUsersPermissions(
          user.id,
        );

        if (can) {
          console.log('AQUI');
          userPermissions.map(async userPermission => {
            console.log('AQUI 2');

            userPermission.permissions.map(async permission => {
              console.log('AQUI 3');

              const findPermission = await this.permissionsRepository.findById(
                permission.id,
              );

              console.log('AQUI 4');

              if (findPermission && findPermission.name === can) {
                console.log('AQUI 5');

                hasPermission = true;
              }
            });
          });
        }
      }),
    );

    if (!hasPermission) {
      throw new AppError('You do not have permission to access', 401);
    }
  }
}

export default CheckPermissionService;
