import { postsService } from "../services/posts.service.js";

export class PostsController {
  postsService = new postsService();
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
}
