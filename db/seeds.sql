INSERT INTO department (department_name)
VALUES  ("Pre-Production"),
        ("Production"),
        ("Post-Production"),
        ("Marketing");
        

INSERT INTO role (id, role_title, role_salary, department_id)
VALUES  (01, "Producer", 100000.00, 2),
        (02, "Writer", 8000.00, 1),
        (03, "Editor", 75000.00, 3),
        (04, "Promoter", 80000.00, 4),
        (05, "Assistant Producer", 70000.00, 2),
        (06, "Actor/Talent", 90000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, role_title, department_id)
VALUES  ("Sabrina", "Salvati", 6, "Actor/Talent", 2),
        ("Richard", "Wolf", 1, "Producer", 2),
        ("Glenn", "Greenwald", 2, "Writer", 1),
        ("Alif", "Vasquez", 3, "Editor", 3),
        ("Hannah", "Price", 4, "Promoter", 4),
        ("Aeryn", "Daboin", 5, "Assistant Producer", 2),
        ("Marta", "Mack", 6, "Actor/Talent", 2),
        ("Mike", "Mansen", 1,"Producer", 2),
        ("Sarah","Johnson", 2, "Writer", 1);
     

