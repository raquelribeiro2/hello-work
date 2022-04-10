import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

import Permission from '../../infra/typeorm/entities/Permission';

class FakePermissionsRepository implements IPermissionsRepository {
  private permissions: Permission[] = [];

  public async findByName(name: string): Promise<Permission | undefined> {
    const findPermission = this.permissions.find(
      permission => permission.name === name,
    );

    return findPermission;
  }

  public async findById(id: string): Promise<Permission | undefined> {
    const findPermission = this.permissions.find(
      permission => permission.id === id,
    );

    return findPermission;
  }
}

export default FakePermissionsRepository;
