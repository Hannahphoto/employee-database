INSERT INTO department (id, department_name)
VALUES  (01, "Pre-Production"),
        (02, "Production"),
        (03, "Post-Production"),
        (04, "Marketing");
        

INSERT INTO role (id, role_title, role_salary, department_id)
VALUES  (01, "Producer", $100,000.00, 02),
        (02, "Writer", $80,000.00, 01),
        (03, "Editor", $75,000.00, 03),
        (04, "Promoter", $80,000.00, 04),
        (05, "Assistant Producer", $70,000.00, 02),
        (06. "Actor/Talent", $90,000.00, 02);

INSERT INTO employee (id, first_name, last_name, role_title, department_id,)
VALUES  (01, "Sabrina", "Salvati", "Actor/Talent", 02),
        (02, "Richard", "Wolf", "Producer", 02),
        (03, "Glenn", "Greenwald", "Writer", 01),
        (04, "Alif", "Vasquez", "Ediotr", 03),
        (05, "Hannah", "Price", "Promoter", 04),
        (06, "Aeryn", "Daboin", "Assistant Producer", 02),
        (07, "Marta", "Mack", "Actor/Talent", 02),
        (08, "Mike", "Mansen", "Producer", 02),
        (09, "Sarah","Johnson", "Writer", 01);
     

