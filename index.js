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
                    'Update an Employee Role'
                ]}]);

                switch(answers.options){
                    case 'Add a department':
                        return captureDept();
                    case 'Add a role':
                        return captureRole();
                    case 'Add an Employee':
                        return captureEmployee();
                    case 'View All Departments':
                        return pullFromDepartment();
                    case 'View all Roles':
                        return pullFromRoles();
                    case 'View all Employees':
                         return pullFromEmployees();
                    case 'Update an Employee Role':
                        return captureRole();
                }
};

//exit function


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
        rolesArr.unshift(["id","role_title", "role_salary", "department_id"]);
        //print table
        console.log(table(rolesArr));
      } catch (error){
        console.error('Error executing SQL query:', error.message);
      }

// menu();
};

async function pullFromEmployees(){
    updateEmployee();
    try{
        const resultsEmployees = await db.query('SELECT * FROM employee');
        //get data from results
        console.log(resultsEmployees[0]);
        //table module 
        // //table columns names
        const employeeArr = resultsEmployees[0].map(row => Object.values(row));
        //add column names 
        employeeArr.unshift(["id", "first_name", "last_name", "role_id", "role_title", "department_id"]);
        //print table
        console.log(table(employeeArr));
      } catch (error){
        console.error('Error executing SQL query:', error.message);
      }

// menu();
};

//capture input data
async function captureDept(){
    console.log("finish capture input");
    const answers = await inquirer.prompt([{
        type: "input",
        name: "department_name",
        message: "what department do you want to add?"
    },
]);
    console.log(answers)
    await insertDepartment(answers);
};

async function captureRole(){
    const answers = await inquirer.prompt([{
        type:"input",
        name:"role_title",
        message: "What role do you want to add?" 
    },
    {
        type:"input",
        name:"role_salary",
        message:"What is the salary of the role you just added?"
    }

]);
    await insertRole(answers);
};

async function captureEmployee(){
    const answers = await inquirer.prompt([{
        type:"input",
        name:"first_name",
        message: "What is the first name of the new employee you want to add?"
    
    },
    {
        type:"input",
        name:"last_name",
        message: "What is the last name of the new employee you want to add?"
    },
    {
        type:"list",
        name: "options",
        message: "what role will this employee have?",
        choices: [
            'Producer',
            'Writer',
            'Editor',
            'Promoter',
            'Assistant Producer',
            'Ator/Talent',
            'Update an Employee Role',
                 ]  
    },
    {
        type:"input",
        name:"role_salary",
        message:"What is the salary of the role you just added?"
    },
]);
    switch(answers){
        case 'first_name':
            return insertEmployee(answers);
        case 'last_name':
            return insertEmployee(answers);}
    switch(answers.options){
        case 'producer':
        case 'Writer':
        case 'Editor':
        case 'Promoter':
        case 'Assistant Producer':
        case 'Actor/Talent':
            return updateRoles(answers);
        case 'Update an Employee Role':
            return captureRole(answers);
    };
    switch(answers.options){
        case 'role_salary':
            return insertRole(answers)
    };
    await insertEmployee(answers);
    await updateRoles(answers);
};


//const idata = await db.query("INSERT INTO employee?", objInput )
async function insertDepartment(input){
    console.log(input);
    //use prepared statement
    const idata = await db.query("INSERT INTO department SET ?", [input]);
    console.log(idata);
    console.log("Insert Successful");
};

async function insertRole(input){
    console.log(input);
    //use prepared statement
    const idata = await db.query("INSERT INTO role SET ?", [input]);
    console.log(idata);
    console.log("Insert Successful");
};

async function insertEmployee(answers){
    console.log(answers);
    //use prepared statement
    const idata = await db.query("INSERT INTO employee SET `first_name` = ?, `last_name` = ?, `options` = ?,`role_salary` = ?", answers.first_name, answers.last_name, answers.options, answers.role_salary);
    console.log(idata);
    console.log("Insert Successful");
    updateEmployee();
};

async function updateRoles(answers){
    console.log(answers);
    const {first_name, last_name, options} = answers;

    const roleID = await getRoleId(options);

    const idata = await db.query("UPDATE role SET `role_title` = ?, `role_salary`=? WHERE `id`=?", [first_name, last_name, roleID]);
    console.log(idata);
    console.log('Update Successful');
};

async function getRoleId(roleTitle){
    const result = await db.query("SELECT id FROM role WHERE role_title = ?", [roleTitle]);
    return result[0][0].id;
};

async function updateEmployee(answers){
    console.log(answers);
    const {first_name, last_name, options} = answers;
    const empID = await getEmpId(options);
    const idata = await db.query("UPDATE employee SET `first_name` = ?, `last_name`=? WHERE `id`=?", [first_name, last_name, empID]);
    console.log(idata);
    console.log('Employee Update sucessful!');
};

async function getEmpId(options){
    
}

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
    
};

init();