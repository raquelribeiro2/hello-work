import AppError from '@shared/errors/AppError';

import FakeGroupsRepository from '@modules/permissions/repositories/fakes/FakeGroupsRepository';
import FakePermissionsRepository from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import FakeModulesRepository from '@modules/permissions/repositories/fakes/FakeModulesRepository';
import FakeUsersGroupsRepository from '@modules/permissions/repositories/fakes/FakeUsersGroupsRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeGroupsRepository: FakeGroupsRepository;
let fakeUsersGroupsRepository: FakeUsersGroupsRepository;
let fakeModulesRepository: FakeModulesRepository;
let fakePermissionsRepository: FakePermissionsRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeGroupsRepository = new FakeGroupsRepository();
    fakeUsersGroupsRepository = new FakeUsersGroupsRepository();
    fakeModulesRepository = new FakeModulesRepository();
    fakePermissionsRepository = new FakePermissionsRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeModulesRepository,
      fakeGroupsRepository,
      fakeUsersGroupsRepository,
      fakePermissionsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const module = await fakeModulesRepository.create('attendances');

    const group = await fakeGroupsRepository.create({
      name: 'User',
      type: 'user',
    });

    await fakePermissionsRepository.create({
      module_id: module.id,
      group_id: group.id,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canView: true,
    });

    const user = await createUser.execute({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same document from another user', async () => {
    const module = await fakeModulesRepository.create('attendances');

    const group = await fakeGroupsRepository.create({
      name: 'User',
      type: 'user',
    });

    await fakePermissionsRepository.create({
      module_id: module.id,
      group_id: group.id,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canView: true,
    });

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
    const module = await fakeModulesRepository.create('attendances');

    const group = await fakeGroupsRepository.create({
      name: 'Administrator',
      type: 'admin',
    });

    await fakePermissionsRepository.create({
      module_id: module.id,
      group_id: group.id,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canView: true,
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        document: '344.789.657-90',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with permission for a non-existent module', async () => {
    const group = await fakeGroupsRepository.create({
      name: 'Administrator',
      type: 'admin',
    });

    await fakePermissionsRepository.create({
      module_id: 'non-existent module',
      group_id: group.id,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canView: true,
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        document: '34478965790',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with permission for a non-existent group', async () => {
    const module = await fakeModulesRepository.create('attendances');

    await fakePermissionsRepository.create({
      module_id: module.id,
      group_id: 'non-existent group',
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canView: true,
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        document: '34478965790',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
