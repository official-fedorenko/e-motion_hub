window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "/login";
    return;
  }
  if (document.getElementById("user-name")) {
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-phone").textContent = user.phone;
    document.getElementById("user-city").textContent = user.city;
    document.getElementById("user-role").textContent = user.role;
  }

  // Показываем кнопку "Панель администратора" только для admin
  const accountSettings = document.querySelector(".account__settings ul");
  if (accountSettings && user.role === "admin") {
    const adminBtn = document.createElement("li");
    adminBtn.innerHTML =
      '<button class="all__button" onclick="window.location.href=\'/admin\'">Панель администратора</button>';
    accountSettings.insertBefore(adminBtn, accountSettings.firstChild);
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "/login";
    });
  }
});
