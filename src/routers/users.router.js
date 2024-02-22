import express from "express";
import needSigninMiddlware from "../middlwares/need-signin.middlware.js";
import { UsersController } from "../controllers/users.controller.js";

const router = express.Router();

const usersController = new UsersController();

//회원가입 API
router.post("/sign-up", usersController.createUser);

// 로그인 API
router.post("/sign-in", usersController.signIn);

// 내 정보 조회 API
router.get("/users", needSigninMiddlware, usersController.getMyInfo);

export default router;
