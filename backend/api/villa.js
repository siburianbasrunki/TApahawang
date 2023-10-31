const express = require('express');
const db = require('../dbconnect'); 
const router = express.Router();

router.get('/villa', (req, res) => {
  const query = 'SELECT * FROM villa'; 

  db.query(query, (err, results) => {
    if (err) {
      console.error('Kesalahan database:', err);
      res.status(500).json({ error: 'Kesalahan server' });
    } else {
      res.json(results);
    }
  });
});


router.post('/villa', (req, res) => {
  const data = req.body; 

  const query = 'INSERT INTO villa SET ?'; 

  db.query(query, data, (err, result) => {
    if (err) {
      console.error('Kesalahan database:', err);
      res.status(500).json({ error: 'Kesalahan server' });
    } else {
      res.status(201).json({ message: 'Data villa ditambahkan' });
    }
  });
});

router.put('/villa/:id', (req, res) => {
  const id = req.params.id; 
  const data = req.body; 

  const query = 'UPDATE villa SET ? WHERE id = ?'; 

  db.query(query, [data, id], (err, result) => {
    if (err) {
      console.error('Kesalahan database:', err);
      res.status(500).json({ error: 'Kesalahan server' });
    } else {
      res.json({ message: 'Data villa diperbarui' });
    }
  });
});

router.delete('/villa/:id', (req, res) => {
  const id = req.params.id; 

  const query = 'DELETE FROM villa WHERE id = ?'; 

  db.query(query, id, (err, result) => {
    if (err) {
      console.error('Kesalahan database:', err);
      res.status(500).json({ error: 'Kesalahan server' });
    } else {
      res.json({ message: 'Data villa dihapus' });
    }
  });
});

module.exports = router;
