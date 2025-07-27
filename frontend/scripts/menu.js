export function toggleTopMenu() {
  const topButton = document.querySelector("[data-top-nav-button]");

  topButton.addEventListener("click", () => {
    document.querySelector(".top-menu").classList.toggle("open-top-menu");
  });
}
