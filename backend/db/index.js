const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "habit_tracker",
  password: "postgres",
  port: 5432,
});

module.exports = pool;