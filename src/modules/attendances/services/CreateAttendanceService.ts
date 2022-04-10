import { injectable, inject } from 'tsyringe';

import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';
import Attendance from '../infra/typeorm/entities/Attendance';
import ICreateAttendanceDTO from '../dtos/ICreateAttendanceDTO';

@injectable()
class CreateAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({
    user_id,
    date,
  }: ICreateAttendanceDTO): Promise<Attendance> {
    const attendance = await this.attendancesRepository.create({
      user_id,
      date,
    });

    return attendance;
  }
}

export default CreateAttendanceService;
