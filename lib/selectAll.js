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

class Select{
    constructor(){
        this.table = ""
    }
    selectAll(){
      return  db.query(`SELECT * FROM ${this.table}`, function(err,results){
            console.table(results)
    })
    }
}

module.exports = Select