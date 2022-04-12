import Attendance from '../infra/typeorm/entities/Attendance';
import ICreateAttendanceDTO from '../dtos/ICreateAttendanceDTO';
import IUpdateAttendanceDTO from '../dtos/IUpdateAttendanceDTO';

export default interface IAttendancesRepository {
  create({ user_id, date }: ICreateAttendanceDTO): Promise<Attendance>;
  findAll(
    offset?: number,
    limit?: number,
    filters?: {
      fromDay?: Date;
      toDay?: Date;
    },
  ): Promise<[Attendance[], number, boolean, boolean]>;
  findById(id: string): Promise<Attendance | undefined>;
  update({
    attendance_id,
    employee_id,
    date,
  }: IUpdateAttendanceDTO): Promise<Attendance>;
  deleteById(id: string): Promise<void>;
}
