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

  public async findById(id: string | undefined): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findUsersPermissions(id: string): Promise<User[]> {
    const user = await this.ormRepository.find({
      where: { id },
      relations: ['permissions'],
    });

    return user;
  }

  public async findUsersGroups(id: string): Promise<User[]> {
    const user = await this.ormRepository.find({
      where: { id },
      relations: ['groups'],
    });

    return user;
  }

  public async createUserGroup(
    user_id: string,
    group_id: string,
  ): Promise<User | undefined> {
    const userGroup = this.ormRepository.create({
      id: user_id,
      groups: [
        {
          id: group_id,
        },
      ],
    });

    await this.ormRepository.save(userGroup);

    return userGroup;
  }

  public async createUserPermission(
    user_id: string,
    permission_id: string,
  ): Promise<User | undefined> {
    const userPermission = this.ormRepository.create({
      id: user_id,
      permissions: [
        {
          id: permission_id,
        },
      ],
    });

    await this.ormRepository.save(userPermission);

    return userPermission;
  }
}

export default UsersRepository;
