const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({ origin: "https://candy-shop-client1.onrender.com", credentials: true }));
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Serve images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Database
const db = mysql.createConnection({
  host: "containers-us-west-123.railway.app", // DB_HOST
  user: "root",                               // DB_USER
  password: "password123",                    // DB_PASS
  database: "candy_shop",                     // DB_NAME
  multipleStatements: true
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Database connected");

  db.query(initDB, (err) => {
    if (err) console.log("DB init error:", err);
    else console.log("Database and tables ready");
  });
});


// Create database and tables if not exist
const initDB = `

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
`;

db.query(initDB, (err) => {
  if (err) console.log("DB init error:", err);
  else console.log("Database and tables ready");
});

// =======================
// Auth: Register & Login
// =======================

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length) return res.status(400).json({ message: "Email exists" });
    const hashed = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashed],
      (err, results) => {
        if (err) return res.status(500).json({ message: "DB error" });
        req.session.user = { id: results.insertId, username, email };
        res.json({ user: req.session.user });
      }
    );
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });
    req.session.user = { id: user.id, username: user.username, email: user.email };
    res.json({ user: req.session.user });
  });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

// =======================
// Products
// =======================

app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(results[0]);
  });
});

// =======================
// Cart
// =======================

app.post("/api/cart", (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  db.query(
    "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
    [user_id, product_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB error" });
      if (results.length) {
        db.query(
          "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
          [quantity, results[0].id],
          (err) => {
            if (err) return res.status(500).json({ message: "DB error" });
            res.json({ message: "Cart updated" });
          }
        );
      } else {
        db.query(
          "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
          [user_id, product_id, quantity],
          (err) => {
            if (err) return res.status(500).json({ message: "DB error" });
            res.json({ message: "Added to cart" });
          }
        );
      }
    }
  );
});

app.get("/api/cart/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.query(
    `SELECT ci.id as cart_id, p.id, p.name, p.price, p.image, ci.quantity
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json(results);
    }
  );
});

app.delete("/api/cart/:product_id", (req, res) => {
  const { product_id } = req.params;
  db.query("DELETE FROM cart_items WHERE product_id = ?", [product_id], (err) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json({ message: "Item removed" });
  });
});

app.delete("/api/cart/user/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.query("DELETE FROM cart_items WHERE user_id = ?", [user_id], (err) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json({ message: "Cart cleared" });
  });
});

// =======================
// Start server
// =======================
// =======================
// Contact
// =======================
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const sql = "INSERT INTO my_custom_contact (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err) => {
    if (err) {
      console.log("Contact insert error:", err);
      return res.status(500).json({ success: false, message: err.message });
    }

    res.json({ success: true });
  });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
