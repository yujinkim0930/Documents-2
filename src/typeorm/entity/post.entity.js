import { EntitySchema } from "typeorm";

new EntitySchema({
  name: "Posts", // Will use table name `category` as default behaviour.
  tableName: "posts", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    postId: {
      primary: true,
      type: "int",
      generated: true,
    },
    userId: {
      type: "int",
    },
    title: {
      type: "varchar",
    },
    content: {
      type: "varchar",
    },
    status: {
      type: "varchar",
    },
    createdAt: {
      type: "datetime",
    },
    updatedAt: {
      type: "datetime",
    },
  },
  relations: {
    user: {
      target: "Users",
      type: "many-to-one",
      joinTable: true,
      joinColumn: { name: "userId" },
      cascade: true,
    },
  },
});

export default EntitySchema;
