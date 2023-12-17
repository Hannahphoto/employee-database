INSERT INTO department (id, department_name)
VALUES  (01, "Pre-Production"),
        (02, "Production"),
        (03, "Post-Production"),
        (04, "Marketing");
        

INSERT INTO role (id, role_title, role_salary, department_id)
VALUES  (01, "Producer", 100000.00, 02),
        (02, "Writer", 80000.00, 01),
        (03, "Editor", 75000.00, 03),
        (04, "Promoter", 80000.00, 04),
        (05, "Assistant Producer", 70000.00, 02),
        (06, "Actor/Talent", 90000.00, 02);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES  (01, "Sabrina", "Salvati", 06),
        (02, "Richard", "Wolf", 01),
        (03, "Glenn", "Greenwald", 02),
        (04, "Alif", "Vasquez", 03),
        (05, "Hannah", "Price", 04),
        (06, "Aeryn", "Daboin", 05),
        (07, "Marta", "Mack", 06),
        (08, "Mike", "Mansen", 01),
        (09, "Sarah","Johnson", 02);
     

