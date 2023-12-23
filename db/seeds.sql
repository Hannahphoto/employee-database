INSERT INTO department (id, department_name)
VALUES  (01, "Pre-Production"),
        (02, "Production"),
        (03, "Post-Production"),
        (04, "Marketing");
        

INSERT INTO role (id, role_title, role_salary, department_id,)
VALUES  (01, "Producer", 100,000.00, 02, ),
        (02, "Writer", 80,00.00, 01, ),
        (03, "Editor", 75,000.00, 03, ),
        (04, "Promoter", 80,000.00, 04,),
        (05, "Assistant Producer", 70,000.00, 02,),
        (06, "Actor/Talent", 90,000.00, 02, );

INSERT INTO employee (id, first_name, last_name, role_id, role_title)
VALUES  (01, "Sabrina", "Salvati", 06, "Actor/Talent"),
        (02, "Richard", "Wolf", 01, "Producer"),
        (03, "Glenn", "Greenwald", 02, "Writer"),
        (04, "Alif", "Vasquez", 03, "Editor"),
        (05, "Hannah", "Price", 04, "Promoter"),
        (06, "Aeryn", "Daboin", 05, "Assistant Producer"),
        (07, "Marta", "Mack", 06, "Actor/Talent"),
        (08, "Mike", "Mansen", 01,"Producer" ),
        (09, "Sarah","Johnson", 02, "Writer");
     

