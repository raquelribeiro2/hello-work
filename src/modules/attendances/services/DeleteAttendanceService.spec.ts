import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeAttendancesRepository from '../repositories/fakes/FakeAttendancesRepository';
import DeleteAttendanceService from './DeleteAttendanceService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAttendancesRepository: FakeAttendancesRepository;
let deleteAttendance: DeleteAttendanceService;

describe('DeleteAttendance', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAttendancesRepository = new FakeAttendancesRepository();

    deleteAttendance = new DeleteAttendanceService(fakeAttendancesRepository);
  });

  it('should be able to delete a attendance', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    const attendance = await fakeAttendancesRepository.create({
      user_id: user.id,
      date: new Date(Date.now()),
    });

    const attendanceDeleted = await deleteAttendance.execute(attendance.id);

    expect(attendanceDeleted).toBe(undefined);
  });

  it('should not be able to delete a non-existent attendance', async () => {
    await expect(
      deleteAttendance.execute('non-existent attendance'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
