const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint pentru adăugarea RSVP-urilor
app.post("/api/rsvp", async (req, res) => {
    const { name, phone, guests, diet, comments } = req.body;

    if (!name || !phone || !guests) {
        return res.status(400).json({ error: "Toate câmpurile obligatorii trebuie completate." });
    }

    const query = `INSERT INTO guests (name, phone, guests, diet, comments) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [name, phone, guests, diet, comments], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Eroare la salvarea datelor." });
        }
        res.status(200).json({ message: "RSVP înregistrat cu succes!" });
    });
});

// Pornire server
app.listen(PORT, () => console.log(`Serverul rulează pe http://localhost:${PORT}`));
