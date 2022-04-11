import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAttendanceService from '@modules/attendances/services/CreateAttendanceService';
import ListAttendancesService from '@modules/attendances/services/ListAttendancesService';
import UpdateAttendanceService from '@modules/attendances/services/UpdateAttendanceService';
import DeleteAttendanceService from '@modules/attendances/services/DeleteAttendanceService';

export default class AttendancesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const createUserAttendance = container.resolve(CreateAttendanceService);

    const attendance = await createUserAttendance.execute({
      user_id,
      date: new Date(Date.now()),
    });

    return response.json(attendance);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { fromDay, toDay, offset, limit } = request.query;

    const listAttendances = container.resolve(ListAttendancesService);

    const attendances = await listAttendances.execute({
      filters: {
        fromDay: fromDay as Date | undefined,
        toDay: toDay as Date | undefined,
      },
      offset: Number(offset),
      limit: Number(limit),
    });

    return response.json(attendances);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { attendance_id } = request.params;

    const { user_id, date } = request.body;

    const updateAttendance = container.resolve(UpdateAttendanceService);

    const attendance = await updateAttendance.execute({
      user_id,
      attendance_id,
      date,
    });

    return response.json(attendance);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { attendance_id } = request.params;

    const deleteAttendance = container.resolve(DeleteAttendanceService);

    await deleteAttendance.execute(attendance_id);

    return response.json({
      message: 'Attendance has been successfully removed',
    });
  }
}
