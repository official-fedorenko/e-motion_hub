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

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "/login";
    });
  }
});
