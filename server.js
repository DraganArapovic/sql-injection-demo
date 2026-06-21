const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const db = new sqlite3.Database("./db.sqlite");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*
==================================
VULNERABLE LOGIN
==================================
*/

app.post("/login-vulnerable", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const query =
        `SELECT * FROM users
         WHERE username='${username}'
         AND password='${password}'`;

    console.log("\nQUERY:");
    console.log(query);

    db.all(query, [], (err, rows) => {

        console.log("ERROR:", err);
        console.log("ROWS:", rows);

        if (err) {
            return res.send(`
                <h1>DATABASE ERROR</h1>
                <pre>${err.message}</pre>
                <a href="/">Back</a>
            `);
        }

        if (rows && rows.length > 0) {
            res.send(`
                <h1>LOGIN SUCCESSFUL</h1>
                <pre>${JSON.stringify(rows,null,2)}</pre>
                <a href="/">Back</a>
            `);
        } else {
            res.send(`
                <h1>LOGIN FAILED</h1>
                <a href="/">Back</a>
            `);
        }
    });
});


/*
==================================
SECURE LOGIN
==================================
*/

app.post("/login-secure", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const query =
        `SELECT * FROM users
         WHERE username=?
         AND password=?`;

    db.all(query,
        [username, password],
        (err, rows) => {

            if (rows && rows.length > 0) {

                res.send(`
                    <h1>LOGIN SUCCESSFUL</h1>
                    <p>Valid credentials.</p>
                    <a href="/">Back</a>
                `);

            } else {

                res.send(`
                    <h1>LOGIN FAILED</h1>
                    <p>SQL Injection hasn't worked.</p>
                    <a href="/">Back</a>
                `);

            }
        });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});