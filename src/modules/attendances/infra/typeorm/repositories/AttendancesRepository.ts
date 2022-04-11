import { getRepository, Repository } from 'typeorm';

import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';

import Attendance from '../entities/Attendance';

class AttendancesRepository implements IAttendancesRepository {
  private ormRepository: Repository<Attendance>;

  constructor() {
    this.ormRepository = getRepository(Attendance);
  }

  public async create(user_id: string): Promise<Attendance> {
    const attendance = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(attendance);

    return attendance;
  }
}

export default AttendancesRepository;
