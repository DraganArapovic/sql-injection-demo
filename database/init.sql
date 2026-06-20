DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
);

INSERT INTO users(username,password)
VALUES
('admin','admin123'),
('dragan','test123'),
('user','password');