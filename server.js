const mysql = require("mysql2");
const consoleTable = require("console.table")
const Employee = require("./lib/employee");
const Department = require('./lib/department');
const Role = require('./lib/role');



const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MySQL23real',
        database: 'employee_db'
    },
    console.log("Connected to employee_db")
);
function mainMenu(data) {
    switch (data.main) {
        case 'view all departments':
            new Department(data.main).selectAll()
            break;
        case 'view all employees':
            new Employee(data.main).selectAll()
            break;
        case 'view all roles':
            new Role(data.main).selectAll();
            break;
        case 'add a department':
            db.query('INSERT INTO department(name) VALUES(?)', data.addDepartment, function (err, results) {
                db.query(`SELECT * FROM department`, (err, results2) => {
                    console.table(results2)
                })
            })
        case 'add a role':
        
        db.query('INSERT INTO role(title, salary, department_id) VALUES(?)',[data.addTitle,data.addSalary,1],(err,results)=>{
            console.table(results)
        })
    }
}

function dropMenu(){
 

    db.query('SELECT name FROM department',(err,results)=>{
       return results.name
        })
    }


module.exports = {mainMenu, dropMenu};

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


