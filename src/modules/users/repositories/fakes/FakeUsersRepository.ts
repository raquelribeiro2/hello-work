import { v4 as uuidV4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
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
}

export default UsersRepository;
