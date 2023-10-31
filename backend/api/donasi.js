const express = require('express');
const db = require('../dbconnect');
const router = express.Router();

// GET Donasi
router.get('/donasi', (req, res) => {
  const query = 'SELECT * FROM donasi';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Kesalahan database:', err);
      res.status(500).json({ error: 'Kesalahan server' });
    } else {
      res.json(results);
    }
  });
});

// POST Donasi
router.post('/donasi', (req, res) => {
  const data = req.body;
  const query = 'INSERT INTO donasi SET ?';
  db.query(query, data, (err, result) => {
    if (err) {
      console.error('Kesalahan database:', err);
      res.status(500).json({ error: 'Kesalahan server' });
    } else {
      res.status(201).json({ message: 'Data donasi ditambahkan' });
    }
  });
});

// PUT Donasi
router.put('/donasi/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const query = 'UPDATE donasi SET ? WHERE DonasiID = ?';
  db.query(query, [data, id], (err, result) => {
    if (err) {
      console.error('Kesalahan database:', err);
      res.status(500).json({ error: 'Kesalahan server' });
    } else {
      res.json({ message: 'Data donasi diperbarui' });
    }
  });
});

// DELETE Donasi
router.delete('/donasi/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM donasi WHERE DonasiID = ?';
  db.query(query, id, (err, result) => {
    if (err) {
      console.error('Kesalahan database:', err);
      res.status(500).json({ error: 'Kesalahan server' });
    } else {
      res.json({ message: 'Data donasi dihapus' });
    }
  });
});

module.exports = router;
