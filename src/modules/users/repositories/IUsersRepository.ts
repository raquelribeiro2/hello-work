import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create({ name, document, password }: ICreateUserDTO): Promise<User>;
  findByDocument(document: string): Promise<User | undefined>;
  findById(id: string | undefined): Promise<User | undefined>;
}
