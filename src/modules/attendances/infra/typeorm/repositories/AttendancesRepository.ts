/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';

import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';

import IUpdateAttendanceDTO from '@modules/attendances/dtos/IUpdateAttendanceDTO';
import ICreateAttendanceDTO from '@modules/attendances/dtos/ICreateAttendanceDTO';
import Attendance from '../entities/Attendance';

class AttendancesRepository implements IAttendancesRepository {
  private ormRepository: Repository<Attendance>;

  constructor() {
    this.ormRepository = getRepository(Attendance);
  }

  public async create({
    user_id,
    date,
  }: ICreateAttendanceDTO): Promise<Attendance> {
    const attendance = this.ormRepository.create({
      user_id,
      date,
    });

    await this.ormRepository.save(attendance);

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
    const attendancesQuery = this.ormRepository
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.user', 'user')
      .select([
        'attendance.id',
        'attendance.date',
        'attendance.created_at',
        'user.id',
        'user.name',
      ])
      .skip(offset || (offset = 0))
      .take(limit || (limit = 20))
      .orderBy('attendance.date', 'DESC');

    if (filters?.fromDay && !filters?.toDay) {
      attendancesQuery.andWhere('attendance.date >= :fromDay', {
        fromDay: filters.fromDay,
      });
    }

    if (filters?.fromDay && filters?.toDay) {
      attendancesQuery.andWhere(
        'attendance.date >= :fromDay and attendance.date <= :toDay',
        {
          fromDay: filters.fromDay,
          toDay: filters.toDay,
        },
      );
    }

    const [attendances, totalAttendances] =
      await attendancesQuery.getManyAndCount();

    let previous = true;

    let next = true;

    if (offset === 0) {
      previous = false;
    }

    if (limit) {
      if (offset === 0 || (offset && offset !== 0)) {
        const existNextPage = limit + offset;

        if (existNextPage >= totalAttendances) {
          next = false;
        }
      }
    }

    return [attendances, totalAttendances, previous, next];
  }

  public async findById(id: string): Promise<Attendance | undefined> {
    const attendance = await this.ormRepository.findOne(id);

    return attendance;
  }

  public async update({
    attendance_id,
    employee_id,
    date,
  }: IUpdateAttendanceDTO): Promise<Attendance> {
    const findAttendance = await this.ormRepository.findOne(attendance_id);

    const updatedAttendance = Object.assign(findAttendance, {
      employee_id,
      date,
    });

    await this.ormRepository.save(updatedAttendance);

    return updatedAttendance;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default AttendancesRepository;
