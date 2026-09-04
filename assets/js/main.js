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

  // Formulario de cotización -> WhatsApp de Innovo Marketing
  const quoteForm = document.getElementById("quoteForm");
  quoteForm.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(quoteForm);
    const name = data.get("name")?.trim() || "No indicado";
    const business = data.get("business")?.trim() || "No indicado";
    const email = data.get("email")?.trim() || "No indicado";
    const phone = data.get("phone")?.trim() || "No indicado";
    const industry = data.get("industry")?.trim() || "No indicado";
    const selectedPackage = data.get("package")?.trim() || "No seleccionado";
    const project = data.get("project")?.trim() || "No indicado";

    const message = `Hola, Innovo Marketing. 👋

Quiero solicitar una cotización para mi negocio.

*Datos del cliente*
Nombre: ${name}
Negocio: ${business}
Correo: ${email}
Teléfono: ${phone}
Tipo de negocio: ${industry}
Paquete de interés: ${selectedPackage}

*Detalles del proyecto*
${project}

Enviado desde el sitio web de Innovo Marketing.`;

    const whatsappNumber = "50375766631";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const msg = document.getElementById("formMessage");
    msg.textContent = "¡Perfecto! Abriendo WhatsApp para enviar tu solicitud...";
    msg.style.color = "#75b0ff";

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
});