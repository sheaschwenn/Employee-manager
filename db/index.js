const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }
    findAllDepartments(){
        return this.connection
        .promise()
        .query(`SELECT * FROM departments`,(results) =>{
                console.table(results)
        })
    }
}