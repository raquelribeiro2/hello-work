import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAttendancesRepository from '../repositories/IAttendancesRepository';
import Attendance from '../infra/typeorm/entities/Attendance';
import IUpdateAttendanceDTO from '../dtos/IUpdateAttendanceDTO';

@injectable()
class UpdateAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    attendance_id,
    date,
  }: IUpdateAttendanceDTO): Promise<Attendance | undefined> {
    const attendance = await this.attendancesRepository.findById(attendance_id);

    if (!attendance) {
      throw new AppError('Attendance not found', 404);
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const attendanceUpdated = await this.attendancesRepository.update({
      attendance_id: attendance.id,
      user_id: user.id,
      date,
    });

    return attendanceUpdated;
  }
}

export default UpdateAttendanceService;
