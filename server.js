
const consoleTable = require("console.table")
const Department = require('./lib/department');
const Role = require('./lib/role');
const inquirer = require("inquirer");
const mysql = require("mysql2");

// creating connection to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MySQL23real',
        database: 'employee_db'
    },
    console.log("Connected to employee_db")
);


// creating a new instance of the Department class 
function viewDepartments(data) {
    return new Department(data.main).selectAll()
    
}
// querying for employee id, name, role, salary, department and manager, joining employee to role and role to department to create a table with all three tables info 
function viewEmployees() {
    db.query('SELECT employee.id,employee.first_name, employee.last_name,role.title,department.name AS department, role.salary,CONCAT(manager.first_name," ",manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id=department.id LEFT JOIN employee manager on manager.id=employee.manager_id', (err, results) => {
        
        return console.table(results)
    })
}
// creating an instance of Role, just querying for everything in role 
function viewRoles(data) {
    
    return new Role(data.main).selectAll();
}
// prompting the user for the department they would like to add
// then inserting that user input into the department table 
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What department would you like to add?',
                name: 'addDepartment'
            }
        ])
        .then((data) => {
            db.query('INSERT INTO department(name) VALUES(?)', data.addDepartment, function (err, results) {
                db.query(`SELECT * FROM department`, (err, results2) => {
                    console.table(results2)
                })
            })
        })
}
// selecting all from department and then storing results in an object and using that object in the next prompt to list all departments
// querying the role table and inserting a new role based on the users input 
function addRole() {
    let choices;
    db.query('SELECT * FROM department', (err, results) => {
        choices = results.map((choice) => {
            return {
                name: choice.name,
                value: choice.id
            }
        })
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role you would like to add?',
                    name: 'addTitle',
                },
                {
                    type: 'input',
                    message: 'What is the salary for the role you would like to add?',
                    name: 'addSalary',

                },
                {
                    type: 'list',
                    message: 'Which department does the role belong to?',
                    choices: choices,
                    name: 'addDepartment',

                }
            ])

            .then((data) => {
                db.query('INSERT INTO role(title, salary, department_id) VALUES(?,?,?)', [data.addTitle, data.addSalary, data.addDepartment], (err, results) => {
                    db.query('SELECT * FROM role', (err, results2) => {
                        console.table(results2)
                    })
                })
            })
    })
}
// selecting all from role and then storing results in an object and using that object in the next prompt to list all roles
// selecting emplyees name and id to use in as a list in user prompts 
// creating an array of objects that are all employees and adding an option of none (that employee has no manager)
function addEmployee() {
    let roles;
    db.query('SELECT * FROM role', (err, results) => {
        roles = results.map((role) => {
            return {
                name: role.title,
                value: role.id
            }
        })
        let managers
        db.query('SELECT employee.first_name, employee.last_name, employee.id FROM employee',
        (err,results)=>{
        managers = results.map((manager)=>{
            return{
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
            }
        
        })
        managers = [{name: 'None',value:null},...managers];
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'First name of the employee you would like to add',
                    name: 'addFirstName',
                },
                {
                    type: 'input',
                    message: 'Last name of the employee you would like to add',
                    name: 'addLastName',
                },
                {
                    type: 'list',
                    message: 'What is the role of this employee?',
                    name: 'addERole',
                    choices: roles

                },
                {
                    type: 'list',
                    message: 'Who is this employees manager?',
                    name: 'addEManager',
                    choices: managers
                },
            ])
// using users input to create a new employee and add it to the employee table in the db
            .then((data) => {
                console.log(data)
                db.query('INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)',
                    [data.addFirstName, data.addLastName, data.addERole, data.addEManager], (err, results) => {
                        db.query('SELECT * FROM employee', (err, results2) => {
                            console.table(results2)
                        })
                    })
            })
        })
    })
}
// updating and employee
// selecting all from table employee and storing employee name and id as an object in an array of employees 
// using that to then prompt the user to choose an employee to update
// selecting all from roles and storing role title and id as an object in an array of roles 
// getting a list of employees an option of no manager 
function updateEmployee() {
    let employees;
    db.query('SELECT * FROM employee', (err, results) => {
        employees = results.map((employee) => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        })
        let roles;
        db.query('SELECT * FROM role', (err, results) => {
            roles = results.map((role) => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
            let managers
        db.query('SELECT employee.first_name, employee.last_name, employee.id FROM employee',
        (err,results)=>{
        managers = results.map((manager)=>{
            return{
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
            }
        
        })
        managers = [{name: 'None',value:null},...managers];

            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: 'Which employee would you like to update?',
                        name: 'eName',
                        choices: employees
                    },

                    {
                        type: 'list',
                        message: 'Which role would you like to change this employee to?',
                        name: 'newRole',
                        choices: roles
                    },
                    {
                        type:'list',
                        message:`Who is this employee's manager?`,
                        name: 'newManager',
                        choices:managers
                    }

                ])
// using user input to update and employee , quering for an employee id that matches the employee name chosen 
// setting their role and manager to the user input
                .then((data) => {
                    db.query('Update employee SET role_id =?, manager_id=? WHERE id=?', [data.newRole, data.newManager,data.eName], (err, results) => {
                        db.query('SELECT * FROM employee', (err, results2) => {
                            console.table(results2)
                        })
                    })
                })
        })
    })
    })
}

// exporting all functions needed for the index.js
module.exports = { viewDepartments, viewEmployees, viewRoles, addDepartment, addRole, addEmployee, updateEmployee };


