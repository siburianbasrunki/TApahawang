const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.get("/volunteer", (req, res) => {
  const query = "SELECT * FROM volunteer";

  db.query(query, (err, results) => {
    if (err) {
      console.log("Kesalahan database");
      res.status(500).json({ error: ";Kesalahan server" });
    } else {
      res.json(results);
    }
  });
});

router.post("/volunteer", (req, res) => {
  const data = req.body;
  const query = "INSERT INTO volunteer SET ?";

  db.query(query, data, (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      res.status(500).json({ error: "Kesalahan server" });
    } else {
      res.status(201).json({ message: "Data volunteer ditambahkan" });
    }
  });
});

router.put("/volunteer/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const query = "UPDATE volunteer SET ? WHERE VolunteerID = ?";

  db.query(query, [data, id], (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      res.status(500).json({ error: "Kesalahan server" });
    } else {
      res.json({ message: "Data volunteer diperbarui" });
    }
  });
});

router.delete("/volunteer/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM volunteer WHERE VolunteerID = ?";

  db.query(query, id, (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      res.status(500).json({ error: "Kesalahan server" });
    } else {
      res.json({ message: "Data volunteer dihapus" });
    }
  });
});

module.exports = router;
