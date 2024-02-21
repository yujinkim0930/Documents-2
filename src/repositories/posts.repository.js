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

  findAllPosts = async () => {
    const posts = await prisma.posts.findMany();
    return posts;
  };

  findPostById = async (postId) => {
    const post = await prisma.posts.findUnique({
      where: { postId: +postId },
    });

    return post;
  };

  updatePost = async (postId, userId, title, content, status) => {
    const updatePost = await prisma.posts.update({
      where: {
        postId: +postId,
      },
      data: {
        title,
        content,
        status,
      },
    });
  };

  deletePost = async (postId) => {
    const deletedPost = await prisma.posts.delete({
      where: {
        postId: +postId,
      },
    });

    return deletedPost;
  };
}
