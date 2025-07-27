const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err.message);
  } else {
    console.log("Подключение к базе данных успешно установлено.");
  }
});

module.exports = db;

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      password TEXT,
      city TEXT,
      role TEXT DEFAULT 'user'
    )`
  );
});
