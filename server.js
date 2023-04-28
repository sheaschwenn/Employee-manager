const express = require("express");
const mysql = require("mysql2");

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
function mainMenu(){
if(data.main === "view all employees"){
    db.query('SELECT * FROM employee', function(err,results){
        console.log(results)
    })
}
}