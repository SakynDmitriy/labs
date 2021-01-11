const Pool = require('pg').Pool;
const pool = new Pool({
  user: "postgres",
  password: "1",
  host: "localhost",
  database: "students",
  port: 5432
});

module.exports = pool;