window.addEventListener("DOMContentLoaded", () => {
  fetch("/components/menu.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("main-menu").innerHTML = html;
      // Вызовите toggleTopMenu после вставки меню
      import("./menu.js").then(({ toggleTopMenu }) => {
        toggleTopMenu();
      });
    });
});
