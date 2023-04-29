const express = require("express");
const mysql = require("mysql2");
const consoleTable = require("console.table")

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password: 'MySQL23real',
        database: 'employee_db'
    },
    console.log("Connected to employee_db")
);
function mainMenu(data){
if(data.main === "view all employees"){
    db.query('SELECT * FROM employee', function(err,results){
        console.table(results)
    })
}
else if(data.main ==="add a department"){
    db.query('INSERT INTO department(name) VALUES(?)',data.addDepartment, function(err,results){
        db.query(`SELECT * FROM department`, (err,results2)=>{
            console.table(results2)
        })
        
})
}
else if (data.main === "view all departments"){
    db.query(`SELECT * FROM department`, (err,results) =>{
        console.table(results)
    })
}
else if(data.main ===""){}
}

module.exports = mainMenu;