import { postsService } from "../services/posts.service.js";

export class PostsController {
  postsService = new postsService();
  // 게시글 생성
  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const user = res.locals.users;
      if (!title)
        return res.status(400).json({ errorMessage: "제목을 입력해주세요." });
      if (!content)
        return res
          .status(400)
          .json({ errorMessage: "자기소개를 입력해주세요." });
      const createPost = await this.postsService.createPost(
        user.userId,
        title,
        content
      );
      return res.status(201).json({ message: "이력서가 등록되었습니다." });
    } catch (err) {
      next(err);
    }
  };

  // 게시글 조회
  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAllPosts();
      const orderKey = req.query.orderKey ?? "postId";
      const orderValue = req.query.orderValue ?? "desc";

      if (!["postId", "status"].includes(orderKey)) {
        return res
          .status(400)
          .json({ message: "orderKey가 올바르지 않습니다." });
      }
      if (!["asc", "desc"].includes(orderValue.toLowerCase())) {
        return res
          .status(400)
          .json({ message: "orderValue가 올바르지 않습니다." });
      }

      return res.status(200).json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  // 게시글 수정
  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content, status } = req.body;
      const user = res.locals.users;
      if (!title)
        return res.status(400).json({ errorMessage: "제목을 입력해주세요." });
      if (!content)
        return res
          .status(400)
          .json({ errorMessage: "자기소개를 입력해주세요." });
      if (!status)
        return res
          .status(400)
          .json({ errorMessage: "상태 값을 입력해주세요." });
      if (
        ![
          "APPLY",
          "DROP",
          "PASS",
          "INTERVIEW1",
          "INTERVIEW2",
          "FINAL_PASS",
        ].includes(status)
      ) {
        return res
          .status(400)
          .json({ message: "올바르지 않은 상태 값입니다." });
      }
      const updatedPost = await this.postsService.updatePost(
        postId,
        user.userId,
        title,
        content,
        status
      );

      return res.status(200).json({ data: "이력서가 수정되었습니다." });
    } catch (err) {
      next(err);
    }
  };
}
