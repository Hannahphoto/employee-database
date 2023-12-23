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

                switch(answers.options){
                    case 'insert data':
                        return captureInput();
                }
                switch(answers.options){
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
  try{
    const resultsDept = await db.query('SELECT * FROM department');
    //get data from results
    console.log(resultsDept[0]);
    //table module 
    // //table columns names
    const deptArr = resultsDept[0].map(row => Object.values(row));
    //add column names 
    deptArr.unshift(["id", "department_name"]);
    //print table
    console.log(table(deptArr));
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
    // console.log(db);


    await menu();
    await pullFromDepartment();
};
init();