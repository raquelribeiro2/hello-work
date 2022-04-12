import { v4 as uuidV4 } from 'uuid';

import IModulesRepository from '../IModulesRepository';

import Module from '../../infra/typeorm/entities/Module';

class FakeModulesRepository implements IModulesRepository {
  private modules: Module[] = [];

  public async create(name: string): Promise<Module> {
    const module = new Module();

    Object.assign(module, {
      id: uuidV4(),
      name,
    });

    this.modules.push(module);

    return module;
  }

  public async findByModuleName(name: string): Promise<Module | undefined> {
    const findModule = this.modules.find(module => module.name === name);

    return findModule;
  }
}

export default FakeModulesRepository;
