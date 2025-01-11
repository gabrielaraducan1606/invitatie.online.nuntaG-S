const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "rsvp",
});

db.connect((err) => {
    if (err) {
        console.error("Eroare la conectarea la baza de date:", err);
    } else {
        console.log("Conexiunea la baza de date a fost realizată cu succes.");
    }
});

module.exports = db;
