const inquirer = require("inquirer");
const mainMenu = require("./server")



inquirer
.prompt([
    {
        type:"list",
        message:'What would you like to do?',
        choices:["view all departments","view all employees","add a department","add a role","add an employee","update an employee role"],
        name: 'main'
    },
    {
        type:'input',
        message:'What department would you like to add?',
        name: 'addDepartment',
        when: (choice) => choice.main === "add a department"
    },
    {
        type:'input',
        message:'What role would you like to add?',
        name: 'addRole',
        when: (choice) => choice.main === "add a role"
    },
    {
        type:'input',
        message:'What is the salary for the role you would like to add?',
        name: 'addSalary',
        when: (choice) => choice.main === "add a role"
    },
    {
        type:'input',
        message:'What department is the role you would like to add in?',
        name: 'addDepartment',
        when: (choice) => choice.main === "add a role"
    },
    {
        type:'input',
        message:'What employee would you like to add?',
        name: 'addEmployee',
        when: (choice) => choice.main === "add a department"
    }
])
.then((data) =>{
    mainMenu(data);
})