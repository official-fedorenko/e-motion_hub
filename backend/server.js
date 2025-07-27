const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routes");

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

app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

app.use(router);
