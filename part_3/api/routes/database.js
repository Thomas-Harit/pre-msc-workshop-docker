const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10, // Maximum number of connections in the pool
  host: 'db',
  user: 'root',
  password: 'my-secret-pw',
  database: 'my_database',
  waitForConnections: true,
  queueLimit: 5,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

const verifyConnection = () => {
  pool.getConnection((err) => {
    if (err) {
      console.log("Could not connect to the database. Error: " + err + " retrying in 5 seconds");
      setTimeout(verifyConnection, 5000);
    } else {
      console.log("Connected to the database!");
    }
  })
}

verifyConnection();

module.exports = pool;