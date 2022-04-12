import { v4 as uuidV4 } from 'uuid';

import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

import ICreatePermissionDTO from '@modules/permissions/dtos/ICreatePermissionDTO';
import Permission from '../../infra/typeorm/entities/Permission';

class FakePermissionsRepository implements IPermissionsRepository {
  private permissions: Permission[] = [];

  public async create({
    module_id,
    group_id,
    canCreate,
    canEdit,
    canView,
    canDelete,
  }: ICreatePermissionDTO): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, {
      id: uuidV4(),
      module_id,
      group_id,
      canCreate,
      canEdit,
      canView,
      canDelete,
    });

    this.permissions.push(permission);

    return permission;
  }

  public async findByGroupAndModuleId(
    module_id: string,
    group_id: string,
  ): Promise<Permission | undefined> {
    const findPermission = this.permissions.find(
      permission =>
        permission.module_id === module_id && permission.group_id === group_id,
    );

    return findPermission;
  }
}

export default FakePermissionsRepository;
