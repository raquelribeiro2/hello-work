import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAttendancesRepository from '../repositories/IAttendancesRepository';

@injectable()
class DeleteAttendanceService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute(attendance_id: string): Promise<void> {
    const attendance = await this.attendancesRepository.findById(attendance_id);

    if (!attendance) {
      throw new AppError('Attendance not found', 404);
    }

    await this.attendancesRepository.deleteById(attendance.id);
  }
}

export default DeleteAttendanceService;
