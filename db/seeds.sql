INSERT INTO department(name)
VALUES("Sales"),
("Marketing"),
("Engineering");

INSERT INTO role(title, salary, department_id)
VALUES("Sales Lead",100,1),
("Sales Associate",500,1),
("Marketing Lead",100,2),
("Marketing Associate", 10,2),
("Engineer",50,3),
("Research Assistant", 30,3);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES("Sarah","Cambell",1,Null),
("John","Johnson", 2,1),
("Mark","Joy",3,NULL),
("Suzy","Belle",4,3),
("Leanardo","Pizza",5,NULL),
("Lilly","Dan",6,5);