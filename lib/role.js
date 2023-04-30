const Select = require("./selectAll");

class Role extends Select{
    constructor(){
        super();
        this.table = 'role'
    }
}

module.exports = Role