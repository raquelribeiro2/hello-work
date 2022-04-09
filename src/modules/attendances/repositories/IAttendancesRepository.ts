import Attendance from '../infra/typeorm/entities/Attendance';

export default interface IAttendancesRepository {
  create(user_id: string): Promise<Attendance>;
}
