import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Users", // Will use table name `category` as default behaviour.
  tableName: "users", // Optional: Provide `tableName` property to override the default behaviour for table name.
  columns: {
    userId: {
      primary: true,
      type: "int",
      generated: true,
    },
    client_id: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    grade: {
      type: "varchar",
    },
    name: {
      type: "varchar",
    },
  },
});
