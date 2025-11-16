const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ---------- DATABASE CONNECTION ----------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // XAMPP default
  database: "sustainable_food",
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

// ---------- SIGN UP ----------
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length > 0) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())",
      [name, email, hashedPassword],
      err => {
        if (err) return res.status(500).json({ message: "Error creating user" });
        res.json({ message: "Signup successful" });
      }
    );
  });
});

// ---------- LOGIN ----------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(401).json({ message: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    res.json({ message: "Login successful", name: user.name, email: user.email });
  });
});

// ---------- ANALYTICS ROUTES ----------

// Users Signup Count per Month
app.get("/analytics/users", (req, res) => {
  const sql = `
    SELECT MONTH(created_at) as month, COUNT(*) as count
    FROM users
    GROUP BY MONTH(created_at)
    ORDER BY MONTH(created_at)
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json([]);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const data = results.map(r => ({ month: months[r.month - 1], count: r.count }));
    res.json(data);
  });
});

// Recipes per Diet Type
app.get("/analytics/recipes", (req, res) => {
  const sql = `
    SELECT diet, COUNT(*) as count
    FROM recipes
    GROUP BY diet
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json([]);
    res.json(results);
  });
});

// Most Popular Ingredients (top 10)
app.get("/analytics/ingredients", (req, res) => {
  const sql = `SELECT ingredients FROM recipes`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json([]);
    const counter = {};
    results.forEach(r => {
      let ingArr = [];
      try {
        ingArr = JSON.parse(r.ingredients); // try JSON format
      } catch {
        ingArr = r.ingredients.split(',').map(i => i.trim()); // fallback comma
      }
      ingArr.forEach(i => {
        const ing = i.toLowerCase();
        counter[ing] = (counter[ing] || 0) + 1;
      });
    });
    const sorted = Object.entries(counter)
      .sort((a,b) => b[1] - a[1])
      .slice(0, 10)
      .map(([ingredient,count]) => ({ ingredient, count }));
    res.json(sorted);
  });
});

// ---------- SERVER START ----------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
