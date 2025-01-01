const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username if different
  password: '', // Replace with your MySQL password
  database: 'intellicleanse', // Your database name
});

// Connect to Database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit if unable to connect
  }
  console.log('Connected to the database');
});

// Signup Endpoint
app.post('/api/signup', (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).send('All fields are required');
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');

    // Insert user into the database
    const query = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    db.query(query, [email, username, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).send('Email already exists');
        }
        return res.status(500).send('Error saving user');
      }
      res.status(201).send('User registered successfully');
    });
  });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // Query to get the user
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send('Error retrieving user');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];

    // Compare the entered password with the stored hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Error comparing passwords');

      if (isMatch) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid password');
      }
    });
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
