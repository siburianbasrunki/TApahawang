const express = require("express");
const db = require("../dbconnect");
const router = express.Router();

router.get("/merchandise", (req, res) => {
  const query = "SELECT * FROM merchandise";

  db.query(query, (err, results) => {
    if (err) {
      console.log("Kesalahan database", err);
      res.status(500).json({ error: "Kesalahan Server" });
    } else {
      res.json(results);
    }
  });
});

router.post("/merchandise", (req, res) => {
  const data = req.body;
  const query = "INSERT INTO merchandise SET ?";

  db.query(query, data, (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      res.status(500).json({ error: "Kesalahan server" });
    } else {
      res.status(201).json({ message: "Data merchandise ditambahkan" });
    }
  });
});
router.put("/merchandise/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const query = "UPDATE merchandise SET ? WHERE MerchandiseID = ?";

  db.query(query, [data, id], (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      res.status(500).json({ error: "Kesalahan server" });
    } else {
      res.json({ message: "Data merchandise diperbarui" });
    }
  });
});
router.delete("/merchandise/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM merchandise WHERE MerchandiseID = ?";

  db.query(query, id, (err, result) => {
    if (err) {
      console.error("Kesalahan database:", err);
      res.status(500).json({ error: "Kesalahan server" });
    } else {
      res.json({ message: "Data merchandise dihapus" });
    }
  });
});

module.exports = router;
