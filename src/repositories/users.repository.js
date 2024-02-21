import { prisma } from "../../models/index.js";

export class UsersRepository {
  createUser = async (email, client_Id, password, name, grade) => {
    if (client_Id) {
      const createUser = await prisma.users.create({
        data: {
          client_Id,
          name,
          grade,
        },
      });
      return createUser;
    } else {
      const createUser = await prisma.users.create({
        data: {
          email,
          password,
          name,
          grade,
        },
      });
      return createUser;
    }
  };
}
