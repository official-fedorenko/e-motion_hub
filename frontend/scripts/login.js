const loginForm = document.querySelector(".login__form");
const messageBox = document.getElementById("login-message");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    messageBox.textContent = ""; // очищаем сообщение

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      messageBox.textContent = "Вход выполнен!";
      messageBox.style.color = "green";
      localStorage.setItem("user", JSON.stringify(result));
      setTimeout(() => {
        window.location.href = "/account";
      }, 1000);
    } else {
      messageBox.textContent = "Ошибка: " + result.error;
      messageBox.style.color = "red";
    }
  });
}
