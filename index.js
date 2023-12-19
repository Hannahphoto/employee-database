const inquirer = require('inquirer');
const { table } = require('table');
const mysql = require('mysql2/promise');

//db connection file using dotenv
const startConnection = require('./db/connection');

let db = null;

async function menu(){
    const answers = await inquirer.prompt(
        [
            {
                type: 'list',
                name: 'options',
                message: 'Choose between the following options:',
                choices: [
                    'View all Departments',
                    'View all Roles',
                    'View all Employees',
                    'Add a department',
                    'Add a role',
                    'Add an Employee',
                    'Update an Employee Role',
                ]}]);

                switch(answers.option){
                    case 'insert data':
                        return captureInput();
                }
                switch(answers.option){
                    case 'View All Departments':
                        return pullFromDepartment();
                }
}

//exit function

//capture input data
async function captureInput(){
    console.log("finish capture input")
    return;
};

async function pullFromDepartment (){
    //looking at the schema file
//    console.log(results);
    // const [data, metaData] = await db.query("SELECT * FROM role");
    // const [data, metaData] = await db.query("SELECT * FROM employee");
  try{
    const results = await db.query('SELECT * FROM department');
    console.log(results);
  } catch (error){
    console.error('Error executing SQL query:', error.message);
  }
}

//function to do the sql insert
//use prepared statement
//const objInput = {
    //must match database column and values
//}
//const idata = await db.query("INSERT INTO employee?", objInput )


//start/init functiion. Where the program begins.

async function init(){
    db = await startConnection(
        {
            user: 'root',
            password: 'rootroot',
            database: 'college_db'
        }
    );
    console.log(`Connected to the college_db database.`);
    console.log(db);

    const results = await db.query('SELECT * FROM department');
    console.log(results[0]);

    //get data from results
    const data = results;
    console.log(data);

    //table module
    const data = [
        ['id', 'department name', '0C'],
        ['1A', '1B', '1C'],
        ['2A', '2B', '2C']
    ];
    
    console.log(table(data));

    await menu();
    await pullFromDepartment();
};
init();