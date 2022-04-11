import { getRepository, Repository } from 'typeorm';

import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';

import Permission from '../entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    const permission = await this.ormRepository.findOne({ name });

    return permission;
  }

  public async findById(id: string): Promise<Permission | undefined> {
    const permission = await this.ormRepository.findOne(id);

    return permission;
  }
}

export default PermissionsRepository;
