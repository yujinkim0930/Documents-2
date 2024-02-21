import { UsersRepository } from "../repositories/users.repository.js";

export class UsersService {
  UsersRepository = new UsersRepository();

  createUser = async (email, client_Id, password, name, grade) => {
    if (client_Id) {
      const createUser = await this.UsersRepository.createUser(
        client_Id,
        name,
        grade
      );

      return {
        client_Id: createUser.client_Id,
        name: createUser.name,
        grade: createUser.grade,
      };
    } else {
      const createUser = await this.UsersRepository.createUser(
        email,
        password,
        name,
        grade
      );

      return {
        email: createUser.email,
        password: createUser.password,
        name: createUser.name,
        grade: createUser.grade,
      };
    }
  };
}
