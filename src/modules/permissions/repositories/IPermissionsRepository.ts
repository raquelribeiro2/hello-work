import Permission from '../infra/typeorm/entities/Permission';

export default interface IPermissionsRepository {
  findByName(name: string): Promise<Permission | undefined>;
  findById(id: string): Promise<Permission | undefined>;
}
