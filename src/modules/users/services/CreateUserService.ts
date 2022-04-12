import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IGroupsRepository from '@modules/permissions/repositories/IGroupsRepository';
import IPermissionsRepository from '@modules/permissions/repositories/IPermissionsRepository';
import IUsersGroupsRepository from '@modules/permissions/repositories/IUsersGroupsRepository';
import IModulesRepository from '@modules/permissions/repositories/IModulesRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,

    @inject('UsersGroupsRepository')
    private usersGroupsRepository: IUsersGroupsRepository,

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
      throw new AppError('The document field only accepts numbers', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const module = await this.modulesRepository.findByModuleName('attendances');

    if (!module) {
      throw new AppError('Module not found', 404);
    }

    const group = await this.groupsRepository.findByGroupType('user');

    if (!group) {
      throw new AppError('Group not found', 404);
    }

    const user = await this.usersRepository.create({
      name,
      document,
      password: hashedPassword,
    });

    await this.usersGroupsRepository.create({
      user_id: user.id,
      group_id: group.id,
    });

    await this.permissionsRepository.create({
      module_id: module.id,
      group_id: group.id,
      canCreate: true,
      canEdit: false,
      canView: false,
      canDelete: false,
    });

    return user;
  }
}

export default CreateUserService;
