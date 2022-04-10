import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListAttendancesService from './ListAttendancesService';
import FakeAttendancesRepository from '../repositories/fakes/FakeAttendancesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeAttendancesRepository: FakeAttendancesRepository;
let listAttendances: ListAttendancesService;

describe('ListAttendances', () => {
  beforeEach(() => {
    fakeAttendancesRepository = new FakeAttendancesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listAttendances = new ListAttendancesService(fakeAttendancesRepository);
  });

  it('should be able to list all attendances', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    const attendance1 = await fakeAttendancesRepository.create({
      user_id: user.id,
      date: new Date(Date.now()),
    });

    const attendance2 = await fakeAttendancesRepository.create({
      user_id: user.id,
      date: new Date(Date.now()),
    });

    const allAttendances = await listAttendances.execute({
      offset: 0,
      limit: 10,
    });

    expect(allAttendances).toEqual({
      total: allAttendances.total,
      previous: false,
      next: true,
      results: [attendance1, attendance2],
    });
  });

  it('should be able to list all attendances by filtering by date', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      document: '34478965790',
      password: '123456',
    });

    const attendance1 = await fakeAttendancesRepository.create({
      user_id: user.id,
      date: new Date(Date.now()),
    });

    const attendance2 = await fakeAttendancesRepository.create({
      user_id: user.id,
      date: new Date(Date.now()),
    });

    const allAttendances = await listAttendances.execute({
      offset: 0,
      limit: 10,
      filters: {
        fromDay: new Date(Date.now()),
        toDay: new Date(Date.now()),
      },
    });

    expect(allAttendances).toEqual({
      total: allAttendances.total,
      previous: false,
      next: true,
      results: [attendance1, attendance2],
    });
  });
});
