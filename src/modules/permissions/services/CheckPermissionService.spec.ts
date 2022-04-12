import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import CheckPermissionService from './CheckPermissionService';
import FakePermissionsRepository from '../repositories/fakes/FakePermissionsRepository';
import FakeModulesRepository from '../repositories/fakes/FakeModulesRepository';
import FakeUsersGroupsRepository from '../repositories/fakes/FakeUsersGroupsRepository';
import FakeGroupsRepository from '../repositories/fakes/FakeGroupsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakePermissionsRepository: FakePermissionsRepository;
let fakeUsersGroupsRepository: FakeUsersGroupsRepository;
let fakeGroupsRepository: FakeGroupsRepository;
let fakeModulesRepository: FakeModulesRepository;
let checkPermission: CheckPermissionService;

describe('CheckPermission', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePermissionsRepository = new FakePermissionsRepository();
    fakeModulesRepository = new FakeModulesRepository();
    fakeUsersGroupsRepository = new FakeUsersGroupsRepository();
    fakeGroupsRepository = new FakeGroupsRepository();

    checkPermission = new CheckPermissionService(
      fakeModulesRepository,
      fakeUsersGroupsRepository,
      fakePermissionsRepository,
    );
  });

  it('should be able to check a permission', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    const module = await fakeModulesRepository.create('attendances');

    const group = await fakeGroupsRepository.create({
      name: 'Administrator',
      type: 'admin',
    });

    const permission = await fakePermissionsRepository.create({
      module_id: module.id,
      group_id: group.id,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canView: true,
    });

    await fakeUsersGroupsRepository.create({
      user_id: user.id,
      group_id: group.id,
    });

    await checkPermission.execute({
      user_id: user.id,
      module: module.name,
      permission: 'canCreate',
    });

    expect(permission.canCreate).toBe(true);
  });

  it('should not be able to check a permission if the user group does not exist', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    const module = await fakeModulesRepository.create('attendances');

    const group = await fakeGroupsRepository.create({
      name: 'admin',
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
      checkPermission.execute({
        user_id: user.id,
        module: module.name,
        permission: 'canCreate',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to check a permission if the module does not exist', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    const module = await fakeModulesRepository.create('attendances');

    const group = await fakeGroupsRepository.create({
      name: 'admin',
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
      checkPermission.execute({
        user_id: user.id,
        module: 'non-existent module',
        permission: 'canCreate',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to access any route if you do not have permission', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    const module = await fakeModulesRepository.create('attendances');

    const group = await fakeGroupsRepository.create({
      name: 'user',
      type: 'user',
    });

    await fakePermissionsRepository.create({
      module_id: module.id,
      group_id: group.id,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canView: false,
    });

    await expect(
      checkPermission.execute({
        user_id: user.id,
        module: module.id,
        permission: 'canCreate',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
