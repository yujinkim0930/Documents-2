import { prisma } from "../../models/index.js";
import needSigninMiddlware from "../middlwares/need-signin.middlware.js";

export class PostsRepository {
  createPost = async (userId, title, content) => {
    const createPost = await prisma.posts.create({
      data: {
        userId,
        title,
        content,
      },
    });

    return createPost;
  };
}
