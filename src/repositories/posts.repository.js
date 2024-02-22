import { prisma } from "../../models/index.js";

export class PostsRepository {
  createPost = async (data) => {
    const createPost = await prisma.posts.create({
      data,
    });

    return createPost;
  };

  findAllPosts = async (sort) => {
    const posts = await prisma.posts.findMany({
      select: {
        postId: true,
        title: true,
        content: true,
        user: {
          select: {
            name: true,
          },
        },
        status: true,
        createdAt: true,
      },
      orderBy: [
        {
          [sort.orderKey]: sort.orderValue,
        },
      ],
    });
    return posts;
  };

  findPostById = async (postId) => {
    const post = await prisma.posts.findFirst({
      where: { postId: +postId },
      select: {
        postId: true,
        title: true,
        content: true,
        user: {
          select: {
            name: true,
          },
        },
        status: true,
        createdAt: true,
      },
    });
    return post;
  };

  updatePost = async (postId, data) => {
    const updatePost = await prisma.posts.update({
      where: {
        postId: +postId,
      },
      data,
    });

    return updatePost;
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
