import { UsersRepository } from "../repositories/users.repository.js";

export class UsersService {
  UsersRepository = new UsersRepository();

  findFirstClient = async () => {
    const user = await this.UsersRepository.findFirstClient();

    return {
      user,
    };
  };

  findFirstEmail = async () => {
    const user = await this.UsersRepository.findFirstEmail();

    return {
      user,
    };
  };

  createUserClient = async (client_Id, name, grade) => {
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
  };

  createUserEmail = async (email, password, name, grade) => {
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
  };
}
