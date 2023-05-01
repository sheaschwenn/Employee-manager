
const consoleTable = require("console.table")
const Employee = require("./lib/employee");
const Department = require('./lib/department');
const Role = require('./lib/role');
const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MySQL23real',
        database: 'employee_db'
    },
    console.log("Connected to employee_db")
);



function viewDepartments(data) {
    return new Department(data.main).selectAll()
}

function viewEmployees() {
    db.query('SELECT * FROM employee LEFT JOIN role ON employee.manager_id = role.id', (err, results) => {
        return console.table(results)
    })
}

function viewRoles(data) {
    return new Role(data.main).selectAll();
}

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
        db.query('SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE employee.manager_id IS NULL',
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

                ])

                .then((data) => {
                    db.query('Update employee SET role_id =? WHERE id=?', [data.newRole, data.eName], (err, results) => {
                        db.query('SELECT * FROM employee', (err, results2) => {
                            console.table(results2)
                        })
                    })
                })
        })
    })
}


module.exports = { viewDepartments, viewEmployees, viewRoles, addDepartment, addRole, addEmployee, updateEmployee };


