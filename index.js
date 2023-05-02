const inquirer = require("inquirer");
const { viewDepartments, viewEmployees, viewRoles, addDepartment, addRole, addEmployee, updateEmployee } = require("./server")

// function for all prompts and calling the subsequent functions
function startMenu(){

    inquirer
        .prompt([
            {
                type: "list",
                message: 'What would you like to do?',
                choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"],
                name: 'main'
            }
        ])
        // switch statement to choose the action take depending on the users choice 
        .then((data) => {
            switch (data.main) {
                case 'view all departments':
                    viewDepartments(data)
                    
                    break;
                case 'view all roles':
                    viewRoles(data)
                   

                    break;
                case 'view all employees':
                    viewEmployees()
                
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
                case 'quit':
                    console.log("Goodbye");
                    break;

            }
        })
    
}

// call the function 
startMenu();
