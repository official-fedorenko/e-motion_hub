const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routes");
const db = require("./db"); // используем ваш db.js

app.use(express.json());
app.use(express.static("../frontend/pages"));
app.use("/styles", express.static("../frontend/styles"));
app.use("/assets", express.static("../frontend/assets"));
app.use("/scripts", express.static("../frontend/scripts"));
app.use("/components", express.static("../frontend/components"));
app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "../frontend/pages" });
});
app.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "../frontend/pages" });
});
app.get("/account", (req, res) => {
  res.sendFile("account.html", { root: "../frontend/pages" });
});
app.get("/admin", (req, res) => {
  res.sendFile("admin.html", { root: "../frontend/pages" });
});

app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

app.use(router);

db.get(
  "SELECT * FROM users WHERE email = ?",
  ["admin@mail.com"],
  (err, row) => {
    if (!row) {
      db.run(
        "INSERT INTO users (username, email, phone, password, city, role) VALUES (?, ?, ?, ?, ?, ?)",
        [
          "Администратор",
          "admin@mail.com",
          "+37066614501",
          "12345678",
          "Vilnius",
          "admin",
        ]
      );
      console.log("Администратор добавлен в базу данных.");
    } else {
      console.log("Администратор уже существует.");
    }
  }
);
