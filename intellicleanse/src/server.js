// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");
// const mysql = require("mysql");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Database connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "intellicleanse",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.message);
//     process.exit(1); // Exit process if database connection fails
//   }
//   console.log("Connected to the database");
// });

// // Signup route
// app.post("/signup", (req, res) => {
//   const { email, username, password } = req.body;

//   // Validate input
//   if (!email || !username || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // Check if the email already exists
//   const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
//   db.query(checkEmailQuery, [email], (err, results) => {
//     if (err) {
//       console.error("Database error during email check:", err.message);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     if (results.length > 0) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Hash the password
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) {
//         console.error("Error hashing password:", err.message);
//         return res.status(500).json({ message: "Internal server error" });
//       }

//       // Insert the new user into the database
//       const insertUserQuery =
//         "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
//       db.query(insertUserQuery, [email, username, hashedPassword], (err, result) => {
//         if (err) {
//           console.error("Database error during user insertion:", err.message);
//           return res.status(500).json({ message: "Internal server error" });
//         }

//         res.status(201).json({ message: "User registered successfully" });
//       });
//     });
//   });
// });

// // Start the server
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

// Middleware to enable CORS and parse JSON
app.use(cors());
app.use(bodyParser.json()); // For parsing JSON payloads

// Database configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "intellicleanse",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit the process if the database fails to connect
  }
  console.log("Connected to the intellicleanse database");
});

//post testing
app.post('/signup', (req, res) => {
  res.status(200).send("Signup route is working!");
});


// POST route for signup
app.post("/signup", (req, res) => {
  const { email, username, password } = req.body; // Extract JSON payload

  // Validation: Ensure all fields are present
  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Insert user data into the database
  const query = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
  db.query(query, [email, username, password], (err, result) => {
    if (err) {
      console.error("Error inserting user into the database:", err.message);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(201).json({ message: "User registered successfully" });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
