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
                    case 'View All Departments':
                        return pullFromDepartment();
                    case 'View all Roles':
                        return pullFromRoles();
                    case 'View all Employee':
                         return pullFromEmployees();
                }
};

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
  };

// menu();
};

async function pullFromRoles (){
    try{
        const resultsRoles = await db.query('SELECT * FROM role');
        //get data from results
        console.log(resultsRoles[0]);
        //table module 
        // //table columns names
        const rolesArr = resultsRoles[0].map(row => Object.values(row));
        //add column names 
        rolesArr.unshift(["id", " role_title", "role_salary", "department_id"]);
        //print table
        console.log(table(rolesArr));
      } catch (error){
        console.error('Error executing SQL query:', error.message);
      }

// menu();
};

async function pullFromEmployees(){
    try{
        const resultsEmployees = await db.query('SELECT * FROM employee');
        //get data from results
        console.log(resultsEmployees[0]);
        //table module 
        // //table columns names
        const employeeArr = resultsEmployees[0].map(row => Object.values(row));
        //add column names 
        employeeArr.unshift(["id", "first_name", "last_name", "role_id", "role_title"]);
        //print table
        console.log(table(employeeArr));
      } catch (error){
        console.error('Error executing SQL query:', error.message);
      }

// menu();
};

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
    // await pullFromRoles();
    await pullFromEmployees();
    
}
init();