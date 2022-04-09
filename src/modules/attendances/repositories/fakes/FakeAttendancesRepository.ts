import { v4 as uuidV4 } from 'uuid';

import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';

import Attendance from '../../infra/typeorm/entities/Attendance';

class FakeAttendancesRepository implements IAttendancesRepository {
  private attendances: Attendance[] = [];

  public async create(user_id: string): Promise<Attendance> {
    const attendance = new Attendance();

    Object.assign(attendance, {
      id: uuidV4(),
      user_id,
      created_at: new Date(Date.now()),
    });

    this.attendances.push(attendance);

    return attendance;
  }
}

export default FakeAttendancesRepository;
