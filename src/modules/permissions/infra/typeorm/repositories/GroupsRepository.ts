import { getRepository, Repository } from 'typeorm';

import IGroupsRepository from '@modules/permissions/repositories/IGroupsRepository';
import ICreateGroupDTO from '@modules/permissions/dtos/ICreateGroupDTO';
import Group from '../entities/Group';

class GroupsRepository implements IGroupsRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async create({ name, type }: ICreateGroupDTO): Promise<Group> {
    const group = this.ormRepository.create({
      name,
      type,
    });

    await this.ormRepository.save(group);

    return group;
  }

  public async findByGroupType(type: string): Promise<Group | undefined> {
    const group = await this.ormRepository.findOne({ type });

    return group;
  }
}

export default GroupsRepository;
