--  new database 

CREATE TABLE IF NOT EXISTS users (
    user_id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS customer (
    customer_id int PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_no int,
    FOREIGN KEY (customer_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin (
    admin_id int PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_no int,
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS complaint (
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    phone_no VARCHAR(255),
    address VARCHAR(255),
    fault VARCHAR(255) DEFAULT NULL,
    description VARCHAR(255) DEFAULT NULL,
    pickup_location VARCHAR(255),
    repair_location VARCHAR(255),
    is_completed tinyint(1),
    created_at datetime,
    assigned_at datetime

);

CREATE TABLE IF NOT EXISTS fault (
    fault_id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    fault_name VARCHAR(255) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP
);
