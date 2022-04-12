import { getRepository, Repository } from 'typeorm';

import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

import ICreatePermissionDTO from '@modules/permissions/dtos/ICreatePermissionDTO';
import Permission from '../entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async create({
    module_id,
    group_id,
    canCreate,
    canEdit,
    canView,
    canDelete,
  }: ICreatePermissionDTO): Promise<Permission> {
    const permission = this.ormRepository.create({
      module_id,
      group_id,
      canCreate,
      canEdit,
      canView,
      canDelete,
    });

    await this.ormRepository.save(permission);

    return permission;
  }

  public async findByGroupAndModuleId(
    module_id: string,
    group_id: string,
  ): Promise<Permission | undefined> {
    const permission = await this.ormRepository.findOne({
      where: { module_id, group_id },
    });

    return permission;
  }
}

export default PermissionsRepository;
