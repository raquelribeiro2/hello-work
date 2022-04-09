import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAttendanceService from '@modules/attendances/services/CreateAttendanceService';

export default class AttendancesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const createUserAttendance = container.resolve(CreateAttendanceService);

    const attendance = await createUserAttendance.execute(user_id);

    return response.json(attendance);
  }
}
