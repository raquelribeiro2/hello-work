import Group from '../infra/typeorm/entities/Group';

export default interface IGroupsRepository {
  createPermissionGroup(
    group_id: string,
    permission_id: string,
  ): Promise<Group | undefined>;
  findByName(name: string): Promise<Group | undefined>;
  findById(id: string): Promise<Group | undefined>;
}
