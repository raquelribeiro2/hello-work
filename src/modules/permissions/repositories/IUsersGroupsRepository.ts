import ICreateUserGroupDTO from '../dtos/ICreateUserGroupDTO';
import UserGroup from '../infra/typeorm/entities/UserGroup';

export default interface IUsersGroupsRepository {
  create({ user_id, group_id }: ICreateUserGroupDTO): Promise<UserGroup>;
  findAll(user_id: string): Promise<UserGroup[]>;
}
