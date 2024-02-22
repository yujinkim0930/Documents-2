import { dataSource } from "../typeorm/index.js";

export class PostsRepository {
  createPost = async (data) => {
    const createPost = await dataSource.getRepository("Posts").create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await dataSource.getRepository("Posts").save(createPost);
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
    console.log(postId, data);
    const updatePost = await dataSource
      .getRepository("Posts")
      .update({ postId }, data);

    return updatePost;
  };

  deletePost = async (postId) => {
    console.log("aaa");
    const deletedPost = await dataSource
      .getRepository("Posts")
      .delete({ postId });

    return deletedPost;
  };
}
