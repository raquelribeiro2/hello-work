import { v4 as uuidV4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name,
    document,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuidV4(), name, document, password });

    this.users.push(user);

    return user;
  }

  public async findByDocument(document: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.document === document);

    return findUser;
  }

  public async findById(id: string | undefined): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findUsersPermissions(id: string): Promise<User[]> {
    const findUserPermissions = this.users.filter(
      user => user.id === id && user.permissions,
    );

    return findUserPermissions;
  }

  public async findUsersGroups(id: string): Promise<User[]> {
    const findUserGroups = this.users.filter(
      user => user.id === id && user.groups,
    );

    return findUserGroups;
  }

  public async createUserGroup(
    user_id: string,
    group_id: string,
  ): Promise<User | undefined> {
    const userGroup = new User();

    Object.assign(userGroup, { id: user_id, groups: [{ id: group_id }] });

    this.users.push(userGroup);

    return userGroup;
  }

  public async createUserPermission(
    user_id: string,
    permission_id: string,
  ): Promise<User | undefined> {
    const userPermission = new User();

    Object.assign(userPermission, {
      id: user_id,
      permissions: [{ id: permission_id }],
    });

    this.users.push(userPermission);

    return userPermission;
  }
}

export default FakeUsersRepository;
