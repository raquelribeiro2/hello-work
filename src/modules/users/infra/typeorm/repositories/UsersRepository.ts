import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    document,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      document,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByDocument(document: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ document });

    return user;
  }
}

export default UsersRepository;
