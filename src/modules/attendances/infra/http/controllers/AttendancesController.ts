import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAttendanceService from '@modules/attendances/services/CreateAttendanceService';
import ListAttendancesService from '@modules/attendances/services/ListAttendancesService';
import UpdateAttendanceService from '@modules/attendances/services/UpdateAttendanceService';
import DeleteAttendanceService from '@modules/attendances/services/DeleteAttendanceService';
import CheckPermissionService from '@modules/permissions/services/CheckPermissionService';

export default class AttendancesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const checkPermission = container.resolve(CheckPermissionService);

    await checkPermission.execute({
      user_id,
      module: 'attendances',
      permission: 'canCreate',
    });

    const createUserAttendance = container.resolve(CreateAttendanceService);

    const attendance = await createUserAttendance.execute(user_id);

    return response.json(attendance);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { fromDay, toDay, offset, limit } = request.query;

    const checkPermission = container.resolve(CheckPermissionService);

    await checkPermission.execute({
      user_id,
      module: 'attendances',
      permission: 'canView',
    });

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
    const user_id = request.user.id;

    const { attendance_id } = request.params;

    const { user_id: employee_id, date } = request.body;

    const checkPermission = container.resolve(CheckPermissionService);

    await checkPermission.execute({
      user_id,
      module: 'attendances',
      permission: 'canEdit',
    });

    const updateAttendance = container.resolve(UpdateAttendanceService);

    const attendance = await updateAttendance.execute({
      attendance_id,
      employee_id,
      date,
    });

    return response.json(attendance);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { attendance_id } = request.params;

    const checkPermission = container.resolve(CheckPermissionService);

    await checkPermission.execute({
      user_id,
      module: 'attendances',
      permission: 'canEdit',
    });

    const deleteAttendance = container.resolve(DeleteAttendanceService);

    await deleteAttendance.execute(attendance_id);

    return response.json({
      message: 'Attendance has been successfully removed',
    });
  }
}
