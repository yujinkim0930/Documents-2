import { UsersRepository } from "../repositories/users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsersService {
  UsersRepository = new UsersRepository();

  createUser = async (data) => {
    const { email, client_Id, password, name, grade } = data;
    //clientId (kakao)
    if (client_Id) {
      const user = await this.UsersRepository.findFirstClient(client_Id);

      if (user) {
        throw {
          code: 400,
          errorMessage: "이미 가입된 사용자입니다.",
        };
      }
      await this.UsersRepository.createUser({
        client_Id,
        name,
        grade,
      });
    } else {
      // email
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.UsersRepository.findFirstEmail(email);

      if (user) {
        throw {
          code: 400,
          errorMessage: "이미 가입된 사용자입니다.",
        };
      }
      await this.UsersRepository.createUser({
        email,
        password: hashedPassword,
        name,
        grade,
      });
    }
  };

  signIn = async (client_Id, email, password) => {
    let user;
    if (client_Id) {
      // 카카오 로그인
      user = await this.UsersRepository.findFirstClient(client_Id);

      if (!user)
        throw { code: 401, message: "올바르지 않은 로그인 정보입니다." };
    } else {
      // 이메일 로그인
      if (!email) {
        throw { code: 400, message: "이메일을 입력해주세요." };
      }
      if (!password) {
        throw { code: 400, message: "비밀번호를 입력해주세요." };
      }
      user = await this.UsersRepository.findFirstEmailAndPw(email, password);

      if (!user) throw { code: 401, message: "존재하지 않는 이메일입니다." };
    }

    const accessToken = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.SECRET_KEY,
      { expiresIn: "12h" }
    );
    const refreshToken = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    return { accessToken, refreshToken };
  };
}
