import { getRepository, Repository } from 'typeorm';

import IUsersGroupsRepository from '@modules/permissions/repositories/IUsersGroupsRepository';
import ICreateUserGroupDTO from '@modules/permissions/dtos/ICreateUserGroupDTO';
import UserGroup from '../entities/UserGroup';

class UsersGroupsRepository implements IUsersGroupsRepository {
  private ormRepository: Repository<UserGroup>;

  constructor() {
    this.ormRepository = getRepository(UserGroup);
  }

  public async create({
    user_id,
    group_id,
  }: ICreateUserGroupDTO): Promise<UserGroup> {
    const userGroup = this.ormRepository.create({
      user_id,
      group_id,
    });

    await this.ormRepository.save(userGroup);

    return userGroup;
  }

  public async findAll(user_id: string): Promise<UserGroup[]> {
    const userGroup = await this.ormRepository.find({
      where: { user_id },
    });

    return userGroup;
  }
}

export default UsersGroupsRepository;
