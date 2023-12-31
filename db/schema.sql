DROP DATABASE IF EXISTS college_db;
CREATE DATABASE college_db;

USE college_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    role_title VARCHAR(30),
    role_salary DECIMAL,
    department_id INT ,
    -- department_name VARCHAR(30),
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    role_title VARCHAR(30),
    department_id INT,
    PRIMARY KEY (id),

    FOREIGN KEY (role_id) 
    REFERENCES role(id),

    FOREIGN KEY (department_id) 
    REFERENCES department(id)
);