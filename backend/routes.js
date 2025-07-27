const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/api/register", (req, res) => {
  const { name, email, phone, password, city } = req.body;
  if (!name || !email || !phone || !password) {
    return res
      .status(400)
      .json({ error: "Все обязательные поля должны быть заполнены." });
  }
  const query = `INSERT INTO users (username, email, phone, password, city, role) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [name, email, phone, password, city, "user"], function (err) {
    if (err) {
      return res
        .status(400)
        .json({ error: "Ошибка регистрации пользователя: " + err.message });
    }
    res.json({ id: this.lastID, name, email, phone, city, role: "user" });
  });
});

module.exports = router;

router.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email и пароль обязательны." });
  }
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(query, [email, password], (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Ошибка при входе: " + err.message });
    }
    if (!user) {
      return res.status(401).json({ error: "Неверный email или пароль." });
    }
    res.json({
      id: user.id,
      name: user.username,
      email: user.email,
      phone: user.phone,
      city: user.city,
      role: user.role,
    });
  });
});
