import ICreatePermissionDTO from '../dtos/ICreatePermissionDTO';
import Permission from '../infra/typeorm/entities/Permission';

export default interface IPermissionsRepository {
  create({
    module_id,
    group_id,
    canCreate,
    canEdit,
    canView,
    canDelete,
  }: ICreatePermissionDTO): Promise<Permission>;
  findByGroupAndModuleId(
    module_id: string,
    group_id: string,
  ): Promise<Permission | undefined>;
}
