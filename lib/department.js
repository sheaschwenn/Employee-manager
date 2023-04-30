const Select = require("./selectAll");

class Department extends Select{
    constructor(){
        super();
        this.table = 'department'
    }
}

module.exports = Department