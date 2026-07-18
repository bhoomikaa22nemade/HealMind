const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DATA_PATH = path.join(__dirname, "..", "data", "users.json");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

function loadUsers() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw || "[]");
}

function saveUsers(users) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "A valid email is required" });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6 characters" });
    }

    const users = loadUsers();
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existing) {
      return res.status(409).json({ success: false, message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const users = loadUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// GET /api/auth/me  (protected)
exports.getMe = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};
