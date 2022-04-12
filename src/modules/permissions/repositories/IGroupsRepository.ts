import ICreateGroupDTO from '../dtos/ICreateGroupDTO';
import Group from '../infra/typeorm/entities/Group';

export default interface IGroupsRepository {
  create({ name, type }: ICreateGroupDTO): Promise<Group>;
  findByGroupType(type: string): Promise<Group | undefined>;
}
