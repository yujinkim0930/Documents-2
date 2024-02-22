import { DataSource } from "typeorm";
import PostEntity from "./entity/post.entity.js";
import UserEntity from "./entity/user.entity.js";
import dotenv from "dotenv";

dotenv.config();

export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "tkfkdgody0505^^",
  database: "resume_db",
  synchronize: false,
  entities: [UserEntity, PostEntity],
});

dataSource.initialize().then(() => {
  console.log("TypeORM init");
});
