import { v4 as uuidV4 } from 'uuid';

import IUsersGroupsRepository from '@modules/permissions/repositories/IUsersGroupsRepository';

import ICreateUserGroupDTO from '@modules/permissions/dtos/ICreateUserGroupDTO';
import UserGroup from '../../infra/typeorm/entities/UserGroup';

class FakeUsersGroupsRepository implements IUsersGroupsRepository {
  private usersGroups: UserGroup[] = [];

  public async create({
    user_id,
    group_id,
  }: ICreateUserGroupDTO): Promise<UserGroup> {
    const userGroup = new UserGroup();

    Object.assign(userGroup, {
      id: uuidV4(),
      user_id,
      group_id,
    });

    this.usersGroups.push(userGroup);

    return userGroup;
  }

  public async findAll(user_id: string): Promise<UserGroup[]> {
    const findUserGroup = this.usersGroups.filter(
      userGroup => userGroup.user_id === user_id,
    );

    return findUserGroup;
  }
}

export default FakeUsersGroupsRepository;
