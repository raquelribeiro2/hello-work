import IGroupsRepository from '@modules/permissions/repositories/IGroupsRepository';

import Group from '../../infra/typeorm/entities/Group';

class FakeGroupsRepository implements IGroupsRepository {
  private groups: Group[] = [];

  public async createPermissionGroup(
    group_id: string,
    permission_id: string,
  ): Promise<Group | undefined> {
    const permissionGroup = new Group();

    Object.assign(permissionGroup, {
      id: group_id,
      permissions: [{ id: permission_id }],
    });

    this.groups.push(permissionGroup);

    return permissionGroup;
  }

  public async findByName(name: string): Promise<Group | undefined> {
    const findGroup = this.groups.find(group => group.name === name);

    return findGroup;
  }

  public async findById(id: string): Promise<Group | undefined> {
    const findGroup = this.groups.find(group => group.id === id);

    return findGroup;
  }
}

export default FakeGroupsRepository;
