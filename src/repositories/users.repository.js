import { prisma } from "../../models/index.js";

export class UsersRepository {
  findFirstClient = async (client_Id) => {
    const user = await prisma.users.findFirst({
      where: { client_Id },
    });

    return user;
  };

  createUser = async (data) => {
    await prisma.users.create({
      data,
    });
  };

  findFirstEmail = async (email) => {
    const user = await prisma.users.findFirst({
      where: { email },
    });

    return user;
  };

  findFirstEmailAndPw = async (email, password) => {
    const user = await prisma.users.findFirst({
      where: {
        email,
        password,
      },
    });
  };
}
