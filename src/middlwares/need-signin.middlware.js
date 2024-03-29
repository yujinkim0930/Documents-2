import jwt from "jsonwebtoken";
import { dataSource } from "../typeorm/index.js";

export default async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("인증 정보가 올바르지 않습니다.");
    }
    const [tokenType, tokenValue] = authorization.split(" ");
    if (tokenType !== "Bearer") {
      throw new Error("인증 정보가 올바르지 않습니다.");
    }
    if (!tokenValue) {
      throw new Error("인증 정보가 올바르지 않습니다.");
    }

    const token = jwt.verify(tokenValue, process.env.SECRET_KEY);
    if (!token.userId) {
      throw new Error("인증 정보가 올바르지 않습니다.");
    }
    const user = await dataSource.getRepository("Users").findOne({
      where: {
        userId: token.userId,
      },
    });
    if (!user) {
      throw new Error("인증 정보가 올바르지 않습니다.");
    }
    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
}
