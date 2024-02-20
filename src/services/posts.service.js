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

  findAllPosts = async () => {
    const posts = await this.postsRepository.findAllPosts();
  };

  findPostById = async (postId) => {
    const post = await this.postsRepository.findPostById(postId);

    return {
      postId: post.postId,
      title: post.title,
      content: post.content,
      status: post.status,
      createdAt: post.createdAt,
    };
  };

  updatePost = async (postId, userId, title, content, status) => {
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new Error("이력서 조회에 실패하였습니다.");
    if (post.userId !== userId)
      throw new Error("이력서를 수정할 권한이 없습니다.");
    await this.postsRepository.updatePost(
      postId,
      userId,
      title,
      content,
      status
    );

    const updatePost = await this.postsRepository.findPostById(postId);

    return {
      postId: updatePost.postId,
      userId: updatePost.userId,
      title: updatePost.title,
      content: updatePost.content,
      status: updatePost.status,
      createdAt: updatePost.createdAt,
      updatedAt: updatePost.updatedAt,
    };
  };

  deletePost = async (postId) => {
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new Error("존재하지 않는 게시글입니다.");

    await this.postsRepository.deletePost(postId);

    return {
      postId: post.postId,
      userId: post.userId,
      title: post.title,
      content: post.content,
      status: post.status,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };
}
