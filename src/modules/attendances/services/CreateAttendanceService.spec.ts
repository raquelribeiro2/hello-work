import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAttendancesRepository from '../repositories/fakes/FakeAttendancesRepository';

import CreateAttendanceService from './CreateAttendanceService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAttendancesRepository: FakeAttendancesRepository;
let createAttendance: CreateAttendanceService;

describe('CreateEmployeeAttendance', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAttendancesRepository = new FakeAttendancesRepository();

    createAttendance = new CreateAttendanceService(fakeAttendancesRepository);
  });

  it('should be able to add attendance to the employee', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    const attendance = await createAttendance.execute({
      user_id: user.id,
      date: new Date(Date.now()),
    });

    expect(attendance).toHaveProperty('id');
  });
});
