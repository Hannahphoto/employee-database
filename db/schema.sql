DROP DATABASE IF EXISTS college_db;
CREATE DATABASE college_db;

USE college_db;

CREATE TABLE department (
    id INT NOT NULL AUTO-INCREMENT,
    department_name VARCHAR(30);
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO-INCREMENT,
    role_title VARCHAR(30),
    role_salary DECIMAL NULL
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
)

CREAT TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO-INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),

    FOREIGN KEY (role_id)
    REFERENCES role(id),

    FOREIGN KEY (department_id)
    REFERENCES department(id)
)