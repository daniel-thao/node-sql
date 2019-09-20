-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS bamazon_db;
-- Create a database called programming_db --
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
  id INTEGER(21) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  departmentId VARCHAR(30),
  type VARCHAR(45),
  value INTEGER(11),
  quantity INTEGER(10)
  -- Creates a boolean column called "mastered" which will automatically fill --
  -- with true when a new row is made and the value isn't otherwise defined. --
  -- mastered BOOLEAN DEFAULT true
--   PRIMARY KEY (id)
);

CREATE TABLE departments(
    id INTEGER(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    category VARCHAR(20) NOT NULL
);




-- ======================================================
-- INSERT INTO departments (category)
-- VALUES ("Furniture");

-- INSERT INTO departments (category)
-- VALUES ("Phones");

-- INSERT INTO departments (category)
-- VALUES ("Cooking");

-- INSERT INTO departments (category)
-- VALUES ("Cleaning");

-- INSERT INTO departments (category)
-- VALUES ("Audio");

-- INSERT INTO departments (category)
-- VALUES ("Automobile");

-- INSERT INTO departments (category)
-- VALUES ("Computers");



-- ======================================================
-- Creates new rows
INSERT INTO products (departmentId, type, value, quantity)
VALUES ('Furniture', "Couch", 1000, 4);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Furniture", "Coffee Table", 435, 3);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Furniture", "Chair", 100, 10);

-- ==================
INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Phones", "Samsung Galaxy", 600, 15);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Phones", "iPhone 11", 1250, 1000);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Phones", "Blackberry", 350, 50);

-- ==================
INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Cooking", "Frying Pan", 60, 80);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Cooking", "Slow Cooker", 125, 30);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Cooking", "Wok", 100, 30);

-- ==================
INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Cleaning", "Mop", 25, 15);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Cleaning", "Vaccum", 95, 5);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Cleaning", "Broom", 10, 20);

-- ==================
INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Audio", "BeyerDynamic DT 990 Pro Open Back Headphones", 175, 10);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Audio", "AKG K612 Pro", 140, 7);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Audio", "KRK G4 Rokit Powered Studio Monitor(Single)", 150, 10);

-- ==================
INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Automobile", "Michelin Tire", 200, 12);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Automobile", "GoodYear Tire", 235, 9);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Automobile", "Dunlop Tire", 198, 19);

-- ==================
INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Computers", "13inch Macbook Pro 2018", 1600, 24);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Computers", "Asus ZenBook UX330UA", 700, 17);

INSERT INTO products (departmentId, type, value, quantity)
VALUES ("Computers", "Dell Latitude 7480", 1185, 13);


-- ========================================================================
SELECT * FROM products;
SELECT * FROM departments;

-- SELECT type, value, quantity
-- FROM products INNER JOIN departments ON products.departmentId = departments.id;