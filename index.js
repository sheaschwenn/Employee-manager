const inquirer = require("inquirer");


inquirer
.prompt([
    {
        type:"list",
        message:'What would you like to do?',
        choices:["view all employees","add a department","add a role","add an employee","update an employee role"],
        name: 'main'

    },
])
.then(data)