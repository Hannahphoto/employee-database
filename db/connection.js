require('dotenv').config();

const mysql = require('mysql2/promise');

//read .env and look for the vars:
//DB_HOST=
//DB_USER=
//DB_PASSWORD=
//DB_DATABASE=
// console.log(process.env);

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