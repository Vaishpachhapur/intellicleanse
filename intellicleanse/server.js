const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;


// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "intellicleanse",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// Signup API endpoint
app.post("/signup", (req, res) => {
  const { email, username, password } = req.body;

  // Input validation
  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if the email already exists
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.error("Database error during email check:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Error processing the password." });
      }

      // Insert the new user into the database
      const insertUserQuery =
        "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
      db.query(insertUserQuery, [email, username, hashedPassword], (err) => {
        if (err) {
          console.error("Error inserting user into the database:", err);
          return res.status(500).json({ message: "Database error." });
        }

        res.status(201).json({ message: "Signup successful." });
      });
    });
  });
});


// Login API endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];

    // Compare the password using bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Password comparison error:", err);
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.status(200).json({ message: "Login successful", user });
    });
  });
});

// Configure Multer for file uploads (store file in memory temporarily)
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');  // Change this path to where you want to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Save with a timestamp to avoid conflicts
  }
});
const upload = multer({  storage: storage });

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { originalname, buffer } = req.file;

  const query = "INSERT INTO files (name, data) VALUES (?, ?)";
  db.query(query, [originalname, buffer], (err, result) => {
    if (err) {
      console.error("Error saving file to database:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json({ message: "File uploaded successfully" });
  });
});

// Contact form submission endpoint
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Input validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Insert the contact message into the database
  const insertMessageQuery = "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";

  db.query(insertMessageQuery, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting message into database:", err);  // Log detailed error
      return res.status(500).json({ message: "Error saving the message to the database.", error: err });
    }

    res.status(200).json({ message: "Message submitted successfully!" });
  });
});

// // Configure Multer to handle image upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/');  // Change this path to where you want to save images
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));  // Save with a timestamp to avoid conflicts
//   }
// });

// const upload = multer({ storage: storage });

// Update User Profile API endpoint
app.post("/update-profile", upload.single("image"), (req, res) => {
  const { email, username } = req.body;
  const image = req.file ? req.file.filename : null;  // Get image filename if uploaded

  // Query to update the user profile
  const query = "UPDATE users SET username = ?, image = ? WHERE email = ?";
  
  db.query(query, [username, image, email], (err, result) => {
    if (err) {
      console.error("Error updating user profile:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  });
});



// Endpoint to retrieve the dataset
app.get("/data", (req, res) => {
  const query = "SELECT data FROM files ORDER BY id DESC LIMIT 1";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      try {
        const rawData = result[0].data.toString("utf8");
        if (!rawData.trim()) {
          return res.status(400).json({ message: "File is empty or invalid" });
        }

        const rows = rawData
          .split(/\r?\n/)
          .filter((row) => row.trim()) // Filter empty rows
          .map((row) => row.split(","));

        res.status(200).json(rows);
      } catch (parseError) {
        console.error("Error parsing file data:", parseError);
        res.status(500).json({ message: "Error parsing file data" });
      }
    } else {
      res.status(404).json({ message: "No data found" });
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
