import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

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
      throw new AppError('Document formatting is wrong', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      document,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
