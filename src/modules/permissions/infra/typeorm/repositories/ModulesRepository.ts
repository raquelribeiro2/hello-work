import { getRepository, Repository } from 'typeorm';

import IModulesRepository from '@modules/permissions/repositories/IModulesRepository';
import Module from '../entities/Module';

class ModulesRepository implements IModulesRepository {
  private ormRepository: Repository<Module>;

  constructor() {
    this.ormRepository = getRepository(Module);
  }

  public async create(name: string): Promise<Module> {
    const module = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(module);

    return module;
  }

  public async findByModuleName(name: string): Promise<Module | undefined> {
    const module = await this.ormRepository.findOne({ name });

    return module;
  }
}

export default ModulesRepository;
