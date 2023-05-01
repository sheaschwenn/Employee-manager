const inquirer = require("inquirer");
const { viewDepartments,viewEmployees,viewRoles,addDepartment,addRole} = require("./server")



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
            break;
            case 'update an employee role':
            break;

        }
    })
//         {
//             type: 'input',
//             message: 'What is the name of the role you would like to add?',
//             name: 'addTitle',
//             when: (choice) => choice.main === "add a role"
//         },
//         {
//             type: 'input',
//             message: 'What is the salary for the role you would like to add?',
//             name: 'addSalary',
//             when: (choice) => choice.main === "add a role"
//         },
//         {
//             type: 'list',
//             message: 'Which department does the role belong to?',
//             choices: dropMenu(),
//             name: 'addDepartment',
//             when: (choice) => choice.main === "add a role"
//         },
//         {
//             type: 'input',
//             message: 'First name of the employee you would like to add',
//             name: 'addFirstName',
//             when: (choice) => choice.main === "add an employee"
//         },
//         {
//             type: 'input',
//             message: 'Last name of the employee you would like to add',
//             name: 'addLastName',
//             when: (choice) => choice.main === "add an employee"
//         },
//         {
//             type: 'input',
//             message: 'What is the role of this employee?',
//             name: 'addERole',
//             when: (choice) => choice.main === "add an employee"
//         },
//         {
//             type: 'input',
//             message: 'Who is this employees manager?',
//             name: 'addEManager',
//             when: (choice) => choice.main === "add an employee"
//         },
//         {
//             type: 'input',
//             message: 'Which employee would you like to update?',
//             name: 'addUName',
//             when: (choice) => choice.main === "update an employee"
//         },

// ])
//     .then((data) => {
//         mainMenu(data);
//     })