INSERT INTO department (id, department_name)
VALUES  (01, "Art"),
        (02, "English"),
        (03, "Math"),
        (04, "Civics & Government"),
        (05, "Media"),
        (06, "Science"),
        (07, "Accounting"),
        (08, "Economics"),
        (09, "Computer Science"),
        (10, "History");

INSERT INTO role (id, role_title, role_salary, department_id)
VALUES  (01, "Department Head/Manager", $100,000.00),
        (02, "Professor", $80,000.00),
        (03, "Instructor", $70,000.00),
        (04, "Department Specialist", $60,000.00),
        (05, "Department Staff", $55,000.00),
        (06. "Work Study", $40,000.00);

INSERT INTO employee (id, first_name, last_name, role_id, department_id,)
VALUES  (01, "Sabrina", "Salvati", "Department Head/Mangaer", 05),
        (02, "Richard", "Wolf", "Professor", 08),
        (03, "Glenn", "Greenwald", "Instructor", 04),
        (04, "Alif", "Vasquez", "Department Specialist", 09),
        (05, "Hannah", "Price", "Department Staff", 07),
        (06, "Aeryn", "Daboin", "Work Study", 06),
        (07, "Marta", "Mack", "Department Head/Mangaer", 10),
        (08, "Mike", "Mansen", "Professor", 01),
        (09, "Sarah","Johnson", "Instructor", 02),
        (10, "Denali", "Smith", "Instructor", 03);

