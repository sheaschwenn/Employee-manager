const mysql = require("mysql2");
const consoleTable = require("console.table")
const Employee = require("./lib/employee");
const Department = require('./lib/department');
const Role = require('./lib/role');
const inquirer = require("inquirer");



const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MySQL23real',
        database: 'employee_db'
    },
    console.log("Connected to employee_db")
);

function dropMenu() {

    db.query('SELECT * FROM department', (err, results) => {
        return results
    })
}

function viewDepartments(data) {
    return new Department(data.main).selectAll()
}

function viewEmployees(data) {
    return new Employee(data.main).selectAll()
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
    dropMenu()
    .then((data)=>{
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
        choices: data,
        name: 'addDepartment',
      
    }
])

.then((data)=>{
    db.query('INSERT INTO role(title, salary, department_id) VALUES(?)', [data.addTitle, data.addSalary, data.id], (err, results) => {
        console.table(results)
    })
})
})
}

module.exports = { viewDepartments, viewEmployees, viewRoles, addDepartment, addRole};

    // if(data.main === "view all employees"){
    //     db.query('SELECT * FROM employee', function(err,results){
    //         console.table(results)
    //     })
    // }
    // else if(data.main ==="add a department"){
    //     db.query('INSERT INTO department(name) VALUES(?)',data.addDepartment, function(err,results){
    //         db.query(`SELECT * FROM department`, (err,results2)=>{
    //             console.table(results2)
    //         })

    // })
    // }
    // else if (data.main === "view all departments"){
    //     db.query(`SELECT * FROM department`, (err,results) =>{
    //         console.table(results)
    //     })
    // }
    // else if(data.main ===""){  }


