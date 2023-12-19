const inquirer = require('inquirer');

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
    db = await startConnection();

    const results = await db.query('SELECT * FROM department');
    

    console.log(results[0]);
    await menu();
    await pullFromDepartment();
};
init();