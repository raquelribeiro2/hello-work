/* eslint-disable no-self-compare */
import { v4 as uuidV4 } from 'uuid';

import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';

import IUpdateAttendanceDTO from '@modules/attendances/dtos/IUpdateAttendanceDTO';
import ICreateAttendanceDTO from '@modules/attendances/dtos/ICreateAttendanceDTO';
import Attendance from '../../infra/typeorm/entities/Attendance';

class FakeAttendancesRepository implements IAttendancesRepository {
  private attendances: Attendance[] = [];

  public async create({
    user_id,
    date,
  }: ICreateAttendanceDTO): Promise<Attendance> {
    const attendance = new Attendance();

    Object.assign(attendance, {
      id: uuidV4(),
      user_id,
      date,
    });

    this.attendances.push(attendance);

    return attendance;
  }

  public async findAll(
    offset?: number,
    limit?: number,
    filters?: {
      fromDay?: Date;
      toDay?: Date;
    },
  ): Promise<[Attendance[], number, boolean, boolean]> {
    const findAttendances = this.attendances.filter(attendance => {
      if (
        (filters?.fromDay && attendance.date === filters?.fromDay) ||
        (filters?.toDay && attendance.date === filters?.toDay) ||
        (offset && offset === offset) ||
        (limit && limit === limit)
      ) {
        return attendance;
      }

      return null;
    });

    const totalAttendances = findAttendances.length;

    let previous = true;

    let next = true;

    if (offset === 0) {
      previous = false;
    }

    if (limit && offset) {
      const existNextPage = limit + offset;

      if (existNextPage >= totalAttendances) {
        next = false;
      }
    }

    return [findAttendances, totalAttendances, previous, next];
  }

  public async findById(id: string): Promise<Attendance | undefined> {
    const findAttendance = this.attendances.find(
      attendance => attendance.id === id,
    );

    return findAttendance;
  }

  public async update({
    attendance_id,
    user_id,
    date,
  }: IUpdateAttendanceDTO): Promise<Attendance> {
    const findAttendance = this.attendances.find(
      attendance => attendance.id === attendance_id,
    );

    const updatedAttendance = Object.assign(findAttendance, {
      user_id,
      date,
    });

    this.attendances.push(updatedAttendance);

    return updatedAttendance;
  }

  public async deleteById(id: string): Promise<void> {
    const attendance = new Attendance();

    this.attendances.find(ut => ut.id === id);

    this.attendances.splice(this.attendances.indexOf(attendance));
  }
}

export default FakeAttendancesRepository;
