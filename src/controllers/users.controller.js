import { UsersService } from "../services/users.service.js";
import { prisma } from "../../models/index.js";

export class UsersController {
  UsersService = new UsersService();

  createUser = async (req, res, next) => {
    try {
      const { email, client_Id, password, pwCheck, name, grade } = req.body;
      if (grade && !["user", "admin"].includes(grade)) {
        return res.status(400).json({ message: "등급이 올바르지 않습니다." });
      }
      if (!client_Id) {
        if (!email) {
          return res.status(400).json({ message: "이메일을 입력해주세요." });
        }
        if (!password) {
          return res.status(400).json({ message: "비밀번호를 입력해주세요." });
        }
        if (!pwCheck) {
          return res.status(400).json({ message: "비밀번호를 확인해주세요." });
        }
        if (password.length < 6) {
          return res
            .status(400)
            .json({ errorMessage: "비밀번호는 최소 6자리 이상이어야 합니다." });
        }
        if (password !== pwCheck) {
          return res
            .status(401)
            .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
        }
      }
      if (!name) {
        return res.status(400).json({ message: "이름을 확인해주세요." });
      }

      //clientId (kakao)
      if (client_Id) {
        const user = await this.UsersService.findFirstClient();

        if (user) {
          return res
            .status(409)
            .json({ errorMessage: "이미 가입된 사용자입니다." });
        }
        const createUser = await this.UsersService.createUserClient(
          client_Id,
          name,
          grade
        );
        return res.status(201).json({ client_Id, name });
      } else {
        const user = await this.UsersService.findFirstEmail();

        if (user) {
          return res
            .status(409)
            .json({ errorMessage: "이미 존재하는 이메일입니다." });
        }
        const createUser = await this.UsersService.createUserEmail(
          email,
          password,
          name,
          grade
        );
        return res.status(201).json({ email, name });
      }
    } catch (err) {
      next(err);
    }
  };
}
