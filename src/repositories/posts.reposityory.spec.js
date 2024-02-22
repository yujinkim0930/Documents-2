import { dataSource } from "../typeorm";
import { PostsRepository } from "./posts.repository.js";

jest.mock("../typeorm");

describe("PostsRepository", () => {
  it("정렬된 전체 이력서 조회", async () => {
    dataSource.getRepository = (tableName) => ({
      find: jest.fn(() => ({
        resumeId: 1,
        title: "이력서 제목",
        content: "자기소개",
        status: "APPLY",
        user: {
          name: "홍길동",
        },
        createAt: new Date().toISOString(),
      })),
    });
    const sort = {
      orderKey: "postId",
      orderValue: "desc",
    };
    const result = await PostsRepository.findAllPosts(sort);
    expect(result).toBeDefined();
  });
});
