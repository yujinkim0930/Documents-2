import express from "express";
import { prisma } from "../../models/index.js";
import needSigninMiddlware from "../middlwares/need-signin.middlware.js";
import { PostsController } from "../controllers/posts.controller.js";

const router = express.Router();

const postsController = new PostsController();

// 이력서 생성 API
router.post("/documents", needSigninMiddlware, postsController.createPost);

// 이력서 전체 목록 조회 API
router.get("/documents", postsController.getPosts);
// router.get("/documents", async (req, res) => {
//   const orderKey = req.query.orderKey ?? "postId";
//   const orderValue = req.query.orderValue ?? "desc";
//   if (!["postId", "status"].includes(orderKey)) {
//     return res.status(400).json({ message: "orderKey가 올바르지 않습니다." });
//   }
//   if (!["asc", "desc"].includes(orderValue.toLowerCase())) {
//     return res.status(400).json({ message: "orderValue가 올바르지 않습니다." });
//   }
//   const documents = await prisma.posts.findMany({
//     select: {
//       postId: true,
//       title: true,
//       content: true,
//       user: {
//         select: {
//           name: true,
//         },
//       },
//       status: true,
//       createdAt: true,
//     },
//     orderBy: [
//       {
//         [orderKey]: orderValue.toLowerCase(),
//       },
//     ],
//   });
//   documents.forEach((document) => {
//     document.name = document.user.name;
//     delete document.user;
//   });
//   return res.status(200).json({ data: documents });
// });

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
