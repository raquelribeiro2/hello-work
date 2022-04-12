import Module from '../infra/typeorm/entities/Module';

export default interface IModulesRepository {
  create(name: string): Promise<Module>;
  findByModuleName(name: string): Promise<Module | undefined>;
}
