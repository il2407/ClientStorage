import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "my_database",
};

const mysqlConfig = mysql.createPool(dbConfig);
export default mysqlConfig;
