const inquirer = require("inquirer");
const {mainMenu,dropMenu} = require("./server")



inquirer
.prompt([
    {
        type:"list",
        message:'What would you like to do?',
        choices:["view all departments","view all roles", "view all employees","add a department","add a role","add an employee","update an employee role"],
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
        message:'What is the name of the role you would like to add?',
        name: 'addTitle',
        when: (choice) => choice.main === "add a role"
    },
    {
        type:'input',
        message:'What is the salary for the role you would like to add?',
        name: 'addSalary',
        when: (choice) => choice.main === "add a role"
    },
    {
        type:'list',
        message:'Which department does the role belong to?',
        choices: dropMenu(),
        name: 'addDepartment',
        when: (choice) => choice.main === "add a role"
    },
    {
        type:'input',
        message:'First name of the employee you would like to add',
        name: 'addFirstName',
        when: (choice) => choice.main === "add an employee"
    },
    {
        type:'input',
        message:'Last name of the employee you would like to add',
        name: 'addLastName',
        when: (choice) => choice.main === "add an employee"
    },
    {
        type:'input',
        message:'What is the role of this employee?',
        name: 'addERole',
        when: (choice) => choice.main === "add an employee"
    },
    {
        type:'input',
        message:'Who is this employees manager?',
        name: 'addEManager',
        when: (choice) => choice.main === "add an employee"
    }

])
.then((data) =>{
    mainMenu(data);
})