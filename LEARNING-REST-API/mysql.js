const mysql = require('mysql')

var pool = mysql.createPool({
    "user": proccess.env.MYSQL_USER,
    "password": proccess.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})

exports.pool = pool;