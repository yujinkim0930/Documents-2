import { prisma } from "../../models/index.js";

export class UsersRepository {
  findFirstClient = async (client_Id) => {
    client_Id = await prisma.users.findFirst({
      where: { client_Id },
    });
  };

  findFirstEmail = async (email) => {
    email = await prisma.users.findFirst({
      where: { email },
    });
  };

  createUserClient = async (client_Id, name, grade) => {
    const createUser = await prisma.users.create({
      data: {
        client_Id,
        name,
        grade,
      },
    });
    return createUser;
  };

  createUserEmail = async (email, password, name, grade) => {
    const createUser = await prisma.users.create({
      data: {
        email,
        password,
        name,
        grade,
      },
    });
    return createUser;
  };
}
