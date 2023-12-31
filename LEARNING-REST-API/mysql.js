// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: "root",
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

module.exports = pool;
