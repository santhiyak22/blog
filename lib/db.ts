import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // Change this if needed
  password: "", // Change this if needed
  database: "blog",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
