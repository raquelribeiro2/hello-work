import { v4 as uuidV4 } from 'uuid';

import ICreateGroupDTO from '@modules/permissions/dtos/ICreateGroupDTO';
import IGroupsRepository from '../IGroupsRepository';

import Group from '../../infra/typeorm/entities/Group';

class FakeGroupsRepository implements IGroupsRepository {
  private groups: Group[] = [];

  public async create({ name, type }: ICreateGroupDTO): Promise<Group> {
    const group = new Group();

    Object.assign(group, {
      id: uuidV4(),
      name,
      type,
    });

    this.groups.push(group);

    return group;
  }

  public async findByGroupType(type: string): Promise<Group | undefined> {
    const findGroup = this.groups.find(group => group.type === type);

    return findGroup;
  }
}

export default FakeGroupsRepository;
