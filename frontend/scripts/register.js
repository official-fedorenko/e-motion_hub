const registerForm = document.querySelector(".register__form");
const messageBox = document.getElementById("register-message");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const city = document.getElementById("city").value;

    messageBox.textContent = ""; // очищаем сообщение

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password, city }),
    });

    const result = await response.json();
    if (response.ok) {
      messageBox.textContent = "Регистрация успешна! Ваш id: " + result.id;
      messageBox.style.color = "green";
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); // через 1 секунду перебросит на страницу входа
    } else {
      if (
        result.error &&
        result.error.includes("UNIQUE constraint failed: users.email")
      ) {
        messageBox.textContent = "Пользователь с таким email уже существует.";
      } else {
        messageBox.textContent = "Ошибка: " + result.error;
      }
      messageBox.style.color = "red";
    }
  });
}
