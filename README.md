# SQL Injection Demo Application

## Description

This project demonstrates the difference between an insecure and a secure implementation of user authentication. The goal is to show how SQL Injection attacks can compromise an application and how the use of Prepared Statements prevents such attacks.

The application contains:

* **Vulnerable Login** – susceptible to SQL Injection.
* **Secure Login** – protected using parameterized queries.
* SQLite database with sample user accounts.

## Technologies

* Node.js
* Express.js
* SQLite3
* HTML/CSS

## Installation

Install dependencies:

```bash
npm install
```

## Database Setup

Create the SQLite database:

```bash
sqlite3 db.sqlite
```

Run the SQL script from `database/init.sql` or execute its contents manually.

## Running the Application

Start the server:

```bash
node server.js
```

Open the application in your browser:

```text
http://localhost:3000
```

## Demo

### Vulnerable Login

Example SQL Injection payload:

```sql
' OR 1=1 --
```

This may allow authentication bypass in the vulnerable implementation.

### Secure Login

The same payload will fail because the application uses Prepared Statements and parameterized queries.

## Purpose

This application was developed for the **Software Security** course to demonstrate the importance of secure coding practices and protection against SQL Injection attacks.

## Author

Dragan Arapović
