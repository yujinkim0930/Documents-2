import { dataSource } from "../typeorm/index.js";

export class PostsRepository {
  createPost = async (data) => {
    const createPost = await dataSource.getRepository("Posts").create(data);
    return createPost;
  };

  findAllPosts = async (sort) => {
    const posts = await dataSource.getRepository("Posts").find({
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
      order: {
        [sort.orderKey]: sort.orderValue,
      },
    });
    return posts;
  };

  findPostById = async (postId) => {
    const post = await dataSource.getRepository("Posts").findOne({
      where: { postId: +postId },
      select: {
        postId: true,
        userId: true,
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
    const updatePost = await dataSource.getRepository("Posts").update(
      {
        where: {
          postId: +postId,
        },
      },
      data
    );
    return updatePost;
  };

  deletePost = async (postId) => {
    const deletedPost = await dataSource.getRepository("Posts").delete({
      where: {
        postId: +postId,
      },
    });

    return deletedPost;
  };
}
