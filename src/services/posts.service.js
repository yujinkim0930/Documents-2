import { PostsRepository } from "../repositories/posts.repository.js";

export class postsService {
  postsRepository = new PostsRepository();

  createPost = async (userId, title, content) => {
    const createPost = await this.postsRepository.createPost(
      userId,
      title,
      content
    );

    return {
      postId: createPost.postId,
      userId: createPost.userId,
      title: createPost.title,
      content: createPost.content,
      status: createPost.status,
      createdAt: createPost.createdAt,
      updatedAt: createPost.updatedAt,
    };
  };
}
