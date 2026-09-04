document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  menuButton?.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", nav.classList.contains("open"));
  });
  document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  const packageSelect = document.getElementById("package");
  document.querySelectorAll("[data-package]").forEach(button => {
    button.addEventListener("click", () => {
      const value = button.dataset.package;
      [...packageSelect.options].forEach(option => {
        if (option.text.startsWith(value)) packageSelect.value = option.value;
      });
    });
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
  }, {threshold: 0.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  document.getElementById("quoteForm").addEventListener("submit", e => {
    e.preventDefault();
    const msg = document.getElementById("formMessage");
    msg.textContent = "¡Gracias! El formulario está listo para conectarse a un servicio de correo antes de publicar.";
    msg.style.color = "#75b0ff";
  });
});