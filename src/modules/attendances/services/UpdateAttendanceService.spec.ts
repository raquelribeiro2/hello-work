import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAttendancesRepository from '../repositories/fakes/FakeAttendancesRepository';
import UpdateAttendanceService from './UpdateAttendanceService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAttendancesRepository: FakeAttendancesRepository;
let updateAttendance: UpdateAttendanceService;

describe('UpdateAttendance', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAttendancesRepository = new FakeAttendancesRepository();

    updateAttendance = new UpdateAttendanceService(
      fakeAttendancesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to update a attendance', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    const attendance = await fakeAttendancesRepository.create({
      user_id: user.id,
      date: new Date(Date.now()),
    });

    const attendanceUpdated = await updateAttendance.execute({
      employee_id: user.id,
      attendance_id: attendance.id,
      date: new Date(2022, 3, 10),
    });

    expect(attendanceUpdated?.date).toStrictEqual(new Date(2022, 3, 10));
  });

  it('should not be able to update a non-existent attendance', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    await expect(
      updateAttendance.execute({
        employee_id: user.id,
        attendance_id: 'non-existent attendance',
        date: new Date(2022, 3, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able  to update the attendance of a non-existent user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    const attendance = await fakeAttendancesRepository.create({
      user_id: user.id,
      date: new Date(Date.now()),
    });

    await expect(
      updateAttendance.execute({
        employee_id: 'non-existent user',
        attendance_id: attendance.id,
        date: new Date(2022, 3, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
