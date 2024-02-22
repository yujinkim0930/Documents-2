import dataSource from "../typeorm/index.js";

export class UsersRepository {
  findFirstClient = async (client_Id) => {
    const user = await dataSource.getRepository("Users").findOne({
      where: { client_Id },
    });

    return user;
  };

  createUser = async (data) => {
    await dataSource.getRepository("Users").create({
      data,
    });
  };

  findFirstEmail = async (email) => {
    const user = await dataSource.getRepository("Users").findOne({
      where: { email },
    });

    return user;
  };

  findFirstEmailAndPw = async (email, password) => {
    const user = await dataSource.getRepository("Users").findOne({
      where: {
        email,
        password,
      },
    });
  };
}
