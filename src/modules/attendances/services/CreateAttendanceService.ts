import { injectable, inject } from 'tsyringe';

import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';
import Attendance from '../infra/typeorm/entities/Attendance';

@injectable()
class CreateAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute(user_id: string): Promise<Attendance> {
    const attendance = await this.attendancesRepository.create(user_id);

    return attendance;
  }
}

export default CreateAttendanceService;
