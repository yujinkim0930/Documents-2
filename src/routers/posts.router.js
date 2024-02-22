import express from "express";
import needSigninMiddlware from "../middlwares/need-signin.middlware.js";
import { PostsController } from "../controllers/posts.controller.js";

const router = express.Router();

const postsController = new PostsController();

// 이력서 생성 API
router.post("/documents", needSigninMiddlware, postsController.createPost);

// 이력서 전체 목록 조회 API
router.get("/documents", postsController.getPosts);

// 이력서 상세 조회 API
router.get("/documents/:postId", postsController.getPostById);

// 이력서 수정 API
router.put(
  "/documents/:postId",
  needSigninMiddlware,
  postsController.updatePost
);

// 이력서 삭제 API
router.delete(
  "/documents/:postId",
  needSigninMiddlware,
  postsController.deletePost
);

export default router;
