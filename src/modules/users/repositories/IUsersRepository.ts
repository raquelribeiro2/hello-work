import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create({ name, document, password }: ICreateUserDTO): Promise<User>;
  findByDocument(document: string): Promise<User | undefined>;
  findById(id: string | undefined): Promise<User | undefined>;
  findUsersPermissions(id: string): Promise<User[]>;
  findUsersGroups(id: string): Promise<User[]>;
  createUserGroup(user_id: string, group_id: string): Promise<User | undefined>;
  createUserPermission(
    user_id: string,
    permission_id: string,
  ): Promise<User | undefined>;
}
