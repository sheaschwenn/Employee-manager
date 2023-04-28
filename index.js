const inquirer = require("inquirer");
const mainMenu = require("./server")


inquirer
.prompt([
    {
        type:"list",
        message:'What would you like to do?',
        choices:["view all employees","add a department","add a role","add an employee","update an employee role"],
        name: 'main'
    },
    {
        type:'input',
        message:'What department would you like to add?',
        name: 'addDepartment',
        when: (choice) => choice.main === "add a department"
    }
])
.then((data) =>{
    mainMenu(data);
})