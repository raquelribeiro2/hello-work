import { getRepository, Repository } from 'typeorm';

import IGroupsRepository from '@modules/permissions/repositories/IGroupsRepository';

import Group from '../entities/Group';

class GroupsRepository implements IGroupsRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async createPermissionGroup(
    group_id: string,
    permission_id: string,
  ): Promise<Group | undefined> {
    const permissionGroup = this.ormRepository.create({
      id: group_id,
      permissions: [
        {
          id: permission_id,
        },
      ],
    });

    await this.ormRepository.save(permissionGroup);

    return permissionGroup;
  }

  public async findByName(name: string): Promise<Group | undefined> {
    const group = await this.ormRepository.findOne({ name });

    return group;
  }

  public async findById(id: string): Promise<Group | undefined> {
    const group = await this.ormRepository.findOne(id);

    return group;
  }
}

export default GroupsRepository;
