import { DataSource } from "typeorm";
import { Employee } from "../core/employee/employee";
import { Team } from "../core/team/team";

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: [
    "dist/migrations/db/*.js",
  ],
  entities: [Employee, Team],
  logging: false,
  synchronize: false,
});