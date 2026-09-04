document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  menuButton?.addEventListener("click", () => {
    nav?.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", nav?.classList.contains("open") ? "true" : "false");
  });
  document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => nav?.classList.remove("open")));

  // Formulario de cotización -> WhatsApp de Innovo Marketing
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", e => {
      e.preventDefault();

      const data = new FormData(quoteForm);
      const get = name => String(data.get(name) || "").trim() || "No indicado";

      const message = `Hola, Innovo Marketing. 👋\n\nQuiero solicitar una cotización para mi negocio.\n\n*Datos del cliente*\nNombre: ${get("name")}\nNegocio: ${get("business")}\nCorreo: ${get("email")}\nTeléfono: ${get("phone")}\nTipo de negocio: ${get("industry")}\nPaquete de interés: ${get("package")}\n\n*Detalles del proyecto*\n${get("project")}\n\nEnviado desde el sitio web de Innovo Marketing.`;
      const whatsappUrl = "https://wa.me/50375766631?text=" + encodeURIComponent(message);

      const msg = document.getElementById("formMessage");
      if (msg) {
        msg.textContent = "¡Perfecto! Abriendo WhatsApp para enviar tu solicitud...";
      }

      // Redirección directa para evitar bloqueos de ventanas emergentes.
      window.location.assign(whatsappUrl);
    });
  }

  const packageSelect = document.getElementById("package");
  if (packageSelect) {
    document.querySelectorAll("[data-package]").forEach(button => {
      button.addEventListener("click", () => {
        const value = button.dataset.package;
        [...packageSelect.options].forEach(option => {
          if (option.text.startsWith(value)) packageSelect.value = option.value;
        });
      });
    });
  }

  // Animaciones: no deben impedir que funcione el formulario.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
  }
});