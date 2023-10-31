const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'pahawangdb', 
  });
  
  // Terhubungkan ke database
  db.connect((err) => {
    if (err) {
      console.error('Gagal terhubung ke database:', err);
    } else {
      console.log('Terhubung ke database MySQL');
    }
  });
  
  module.exports = db;
  