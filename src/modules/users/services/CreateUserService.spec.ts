import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same document from another user', async () => {
    await createUser.execute({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        document: '34478965790',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with the wrong document formatting', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        document: '344.789.657-90',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});