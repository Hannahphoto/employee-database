const inquirer = require('inquirer');
const { table } = require('table');
const mysql = require('mysql2/promise');

//db connection file using dotenv
const readline = require('inquirer/lib/utils/readline')
const startConnection = require('./db/connection');


let db = null;


async function menu() {
    const userAnswers = inquirer.prompt(
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
                ]
            }])

    .then((answers) => {
        switch (answers.options){
        case 'View All Departments':
            pullFromDepartment();
            break;
        case 'View all Roles':
            pullFromRoles();
            break;         
        case 'View all Employees':
            pullFromEmployees();
            break;
        case 'Add a department':
            captureDept();
            break;
        case 'Add a role':
            captureRole();
            break;
        case 'Add an Employee':
            captureEmployee();
            break;
        case 'Update an Employee Role':
            updateEmployeeRole();
            break;
    }})
    // .then(()=>{
    //     menu();
    // })
    .catch((error)=> {
        console.error('Error in menu:', error.message);
    });
};

//exit function

 //looking at the schema file
async function pullFromDepartment() {
    try {
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
    } catch (error) {
        console.error('Error executing SQL query:', error.message);
    };

    await menu();
};

async function pullFromRoles() {
    try {
        const resultsRoles = await db.query('SELECT * FROM role');
        //get data from results
        console.log(resultsRoles[0]);
        //table module 
        // //table columns names
        const rolesArr = resultsRoles[0].map(row => Object.values(row));
        //add column names 
        rolesArr.unshift(["id", "role_title", "role_salary", "department_id"]);
        //print table
        console.log(table(rolesArr));
    } catch (error) {
        console.error('Error executing SQL query:', error.message);
    }

    await menu();
};

async function pullFromEmployees() {
    // updateEmployeeRole();
    try {
        const resultsEmployees = await db.query('SELECT employee.id, employee.first_name, employee.last_name, role.role_title FROM employee LEFT JOIN role ON employee.role_id = role.id');
        //get data from results
        console.log(resultsEmployees[0]);
        //table module 
        // //table columns names
        const employeeArr = resultsEmployees[0].map(row => Object.values(row));
        //add column names 
        employeeArr.unshift(["id", "first_name", "last_name", "role_title"]);
        //print table
        console.log(table(employeeArr));
    } catch (error) {
        console.error('Error executing SQL query:', error.message);
    }

    await menu();
};

//capture input data
async function captureDept() {
    console.log("finish capture input");
    const answers = await inquirer.prompt([{
        type: "input",
        name: "department_name",
        message: "what department do you want to add?"
    },
    ]);
    console.log(answers)
    await insertDepartment(answers);

    await menu();
};

async function captureRole() {

    const input = await inquirer.prompt([{
        type: "input",
        name: "role_title",
        message: "What role do you want to add?"
    },
    {
        type: "input",
        name: "role_salary",
        message: "What is the salary of the role you just added?"
    },
    {
        type: "input",
        name: "department_name",
        message: "Which department does this role belong to?",
    },
    ]);
    await insertRole(input);
    // await updateDepartment(input);

    await menu();
};

async function captureEmployee() {
    const answers = await inquirer.prompt([{
        type: "input",
        name: "first_name",
        message: "What is the first name of the new employee you want to add?"

    },
    {
        type: "input",
        name: "last_name",
        message: "What is the last name of the new employee you want to add?"
    },
    {
        type: "list",
        name: "department",
        message: "Which department will this employee be in?",
        choices: [
            'Pre-Production',
            'Production',
            'Post-Production',
            'Marketing',
        ]
    },
    {
        type: "list",
        name: "role",
        message: "What role will this employee have?",
        choices: [
            'Producer',
            'Writer',
            'Editor',
            'Promoter',
            'Assistant Producter',
            'Actor/Talent',
        ]
    },
    ]);

    // await insertDepartment({department_name: answers.department});
    // await insertRole({role_title: answers.role});
    await insertEmployee({ first_name: answers.first_name, last_name: answers.last_name, role: answers.role, department: answers.department });

    await menu();
};


//const idata = await db.query("INSERT INTO employee?", objInput )
async function insertDepartment(input) {
    console.log(input);
    //use prepared statement
    const idata = await db.query("INSERT INTO department SET ?", [input]);
    console.log(idata);
    console.log("Insert Successful");
    // updateDepartment(input);
    // await menu();
};


async function insertRole(input) {
    // updateRoles();
    console.log(input);
    //use prepared statement
    const idata = await db.query("INSERT INTO role SET `role_title` = ?, `role_salary`=?", [input.role_title, input.role_salary]);
    console.log(idata);
    console.log("Role Insert Successful");

    // await menu();
};

async function insertEmployee(answers) {
    console.log(answers);
    // fetch department_id based on department name
    const [department] = await db.query('SELECT id FROM department WHERE department_name =?', [answers.department]);

    if (!department || !department[0] || !department[0].id) {
        console.error('Error: Department not found.');
        return;
    }

    const department_id = department[0].id;

    //fetch role_title based on role_title
    const [role] = await db.query('SELECT id FROM role WHERE role_title =?', [answers.role]);

    if (!role || !role[0] || !role[0].id) {
        console.error('Error: Role not found.');
        return;
    }

    const role_id = role[0].id;

    //use prepared statement
    const idata = await db.query("INSERT INTO employee SET `first_name` = ?, `last_name` = ?, `department_id` = ?", [answers.first_name, answers.last_name, role_id, answers.role, department_id]);
    console.log(idata);
    console.log("Employee insert Successful");

    // await menu();
};

async function updateEmployeeRole() {
    const employees = await db.query('SELECT id, first_name, last_name FROM employee');

    const employeeToUpdate = await inquirer.prompt({
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee whose role you want to update:',
        choices: employees[0].map((row) => ({ name: `${row.first_name} ${row.last_name}`, value: row.id })),
    });

    // Fetch the list of roles
    const roles = await db.query('SELECT id, role_title FROM role');

    const newRole = await inquirer.prompt({
        type: 'list',
        name: 'role_id',
        message: 'Select the new role for the employee:',
        choices: roles[0].map((row) => ({ name: row.role_title, value: row.id })),
    });

    try {
        // await inquirer.prompt({
        //     type: 'input',
        //     name: 'name',
        //     message: JSON.stringify({newRole, employeeToUpdate})})

        await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRole.role_id, employeeToUpdate.employee_id]);
        console.log('Employee role updated successfully.');
    } catch (error) {
        console.error('Error updating employee role:', error.message);
    }

    await menu();
};

// };
//start/init functiion. Where the program begins.
async function init() {
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
    // await pullFromDepartment();
    // await pullFromRoles();
    // await pullFromEmployees();

};

init();