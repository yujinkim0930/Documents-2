import { UsersService } from "../services/users.service.js";

export class UsersController {
  UsersService = new UsersService();

  createUser = async (req, res) => {
    const { email, client_id, password, pwCheck, name, grade } = req.body;
    if (grade && !["user", "admin"].includes(grade)) {
      return res.status(400).json({ message: "등급이 올바르지 않습니다." });
    }
    if (!client_id) {
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
    await this.UsersService.createUser({
      email,
      client_id,
      password,
      name,
      grade,
    });
    return res.status(201).json({ email, name });
  };

  signIn = async (req, res) => {
    const { client_id, email, password } = req.body;

    const token = await this.UsersService.signIn(client_id, email, password);
    return res.json(token);
  };

  getMyInfo = async (req, res) => {
    const user = res.locals.user;
    return res.status(200).json({
      email: user.email,
      name: user.name,
    });
  };
}
