require('dotenv').config();
//  const db = require('college_db');
const mysql = require('mysql2/promise');

//read .env and look for the vars:
// const readEnv = asyn () => {
// DB_HOST=
// DB_USER=
// DB_PASSWORD=
// DB_DATABASE=
// console.log(process.env.DB_DATABASE);
// }
//start connection
const startConnection = async () => {
    //return a db variable that we can use
    return await mysql.createConnection(
        {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE        
        }
    );
};

module.exports = startConnection;