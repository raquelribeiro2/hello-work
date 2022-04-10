import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IGroupsRepository from '@modules/permissions/repositories/IGroupsRepository';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    document,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByDocument(document);

    if (checkUserExists) {
      throw new AppError('This document is already registered', 409);
    }

    const isNumber = document.match(/^\d+$/) !== null;

    if (!isNumber) {
      throw new AppError(
        'The document field only accepts numbers',
        400,
      );
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      document,
      password: hashedPassword,
    });

    const group = await this.groupsRepository.findByName('user');

    if (!group) {
      throw new AppError('Group not found', 404);
    }

    await this.usersRepository.createUserGroup(user.id, group.id);

    const permission = await this.permissionsRepository.findByName(
      'create_attendance',
    );

    if (!permission) {
      throw new AppError('Permission not found', 404);
    }

    await this.usersRepository.createUserPermission(user.id, permission.id);

    await this.groupsRepository.createPermissionGroup(group.id, permission.id);

    return user;
  }
}

export default CreateUserService;
