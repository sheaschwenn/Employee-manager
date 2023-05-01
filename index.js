const inquirer = require("inquirer");
const { viewDepartments,viewEmployees,viewRoles,addDepartment,addRole,addEmployee,updateEmployee} = require("./server")



inquirer
    .prompt([
        {
            type: "list",
            message: 'What would you like to do?',
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
            name: 'main'
        }
    ])
    .then((data) => {
        switch (data.main) {
            case 'view all departments':
                viewDepartments(data)
                break;
            case 'view all roles':
                viewEmployees(data)
                break;
            case 'view all employees':
                viewRoles(data)
                break;
            case 'add a department':
                addDepartment(data)
            break;
            case 'add a role':
                addRole()
            break;
            case 'add an employee':
                addEmployee()
            break;
            case 'update an employee role':
                updateEmployee()
            break;

        }
    })
//         
      
      
// ])
//     .then((data) => {
//         mainMenu(data);
//     })