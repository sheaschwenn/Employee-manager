INSERT INTO department(name)
VALUES("Sales"),
("Marketing"),
("Engineering");

INSERT INTO role(title, salary, department_id)
VALUES("Manager",100,1),
("Assistant", 10,2),
("Engineer",50,3);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES("Sarah","Cambell",1,1),
("John","Johnson", 2,2),
("Mark","Joy",3,1);