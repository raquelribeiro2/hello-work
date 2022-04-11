import { injectable, inject } from 'tsyringe';

import Attendance from '../infra/typeorm/entities/Attendance';
import IAttendancesRepository from '../repositories/IAttendancesRepository';

interface IRequest {
  offset?: number;
  limit?: number;
  filters?: {
    fromDay?: Date;
    toDay?: Date;
  };
}

interface IResponse {
  total: number;
  results: Attendance[];
}

@injectable()
class ListAttendancesService {
  constructor(
    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,
  ) {}

  public async execute({
    filters,
    offset,
    limit,
  }: IRequest): Promise<IResponse> {
    const [attendances, totalAttendances, previous, next] =
      await this.attendancesRepository.findAll(offset, limit, filters);

    const responseFormatted = {
      total: totalAttendances,
      previous,
      next,
      results: attendances,
    };

    return responseFormatted;
  }
}

export default ListAttendancesService;
