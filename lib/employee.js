const Select = require("./selectAll");

class Employee extends Select{
    constructor(){
        super();
        this.table = 'employee'
    }
}

module.exports = Employee