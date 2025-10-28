import mysql from 'mysql2';

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // yahan apna MySQL username daal
  password: 'lapalap@5532', // yahan apna MySQL password daal
  database: 'swashakti_db'
});

// Connect the database
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err);
  } else {
    console.log('✅ Connected to MySQL Database!');
  }
});

export default db;
  