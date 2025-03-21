// backend/db.js
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: 'Nive.haran1',
  database: 'mental_health',
  port: 3306 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

export default db;
