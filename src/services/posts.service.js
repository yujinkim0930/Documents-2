import { PostsRepository } from "../repositories/posts.repository.js";

export class postsService {
  postsRepository = new PostsRepository();

  createPost = async (userId, title, content) => {
    const createPost = await this.postsRepository.createPost(
      userId,
      title,
      content
    );
  };

  findAllPosts = async (sort) => {
    const posts = await this.postsRepository.findAllPosts(sort);

    return posts;
  };

  findPostById = async (postId) => {
    const post = await this.postsRepository.findPostById(postId);

    return post;
  };

  updatePost = async (postId, data, byUser) => {
    const post = await this.postsRepository.findPostById(postId);
    if (!post)
      throw {
        code: 401,
        message: "이력서 조회에 실패하였습니다.",
      };
    if (byUser.grade === "user" && post.userId !== byUser.userId)
      throw {
        code: 401,
        message: "이력서를 수정할 권한이 없습니다.",
      };

    await this.postsRepository.findPostById(postId, data);
  };

  deletePost = async (postId, byUser) => {
    const post = await this.postsRepository.findPostById(postId);
    if (!post)
      throw {
        code: 400,
        message: "이력서 조회에 실패하였습니다.",
      };

    if (post.userId !== byUser.userId)
      throw {
        code: 400,
        message: "이력서를 삭제할 권한이 없습니다.",
      };

    await prisma.posts.delete({ where: { postId: +postId } });
  };
}
