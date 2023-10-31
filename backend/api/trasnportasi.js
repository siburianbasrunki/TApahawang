const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.get("/transportasi", (req, res) => {
  const query = "SELECT * FROM transportasi";

  db.query(query, (err, results) => {
    if (err) {
      console.log("Kesalah database:", err);
      res.status(500).json({ error: "Kesalaham server" });
    } else {
      res.json(results);
    }
  });
});

router.post("/transportasi", (req, res) => {
  const data = req.body;
  const query = "INSERT INTO transportasi SET ?";

  db.query(query, data, (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      res.status(500).json({ error: "Kesalahan server" });
    } else {
      res.status(201).json({ message: "Data transportasi ditambahkan" });
    }
  });
});
router.put("/transportasi/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const query = "UPDATE transportasi SET ? WHERE TransportasiID = ?";

  db.query(query, [data, id], (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      res.status(500).json({ error: "Kesalahan server" });
    } else {
      res.json({ message: "Data transportasi diperbarui" });
    }
  });
});

router.delete("/transportasi/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM transportasi WHERE TransportasiID = ?";

  db.query(query, id, (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      res.status(500).json({ error: "Kesalahan server" });
    } else {
      res.json({ message: "Data transportasi dihapus" });
    }
  });
});

module.exports = router;
