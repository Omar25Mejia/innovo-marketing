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
  quoteForm?.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(quoteForm);
    const get = name => String(data.get(name) || "").trim() || "No indicado";

    const name = get("name");
    const business = get("business");
    const email = get("email");
    const phone = get("phone");
    const industry = get("industry");
    const selectedPackage = get("package");
    const project = get("project");

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
    const whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);

    const msg = document.getElementById("formMessage");
    msg.textContent = "¡Perfecto! Abriendo WhatsApp para enviar tu solicitud...";
    msg.style.color = "#75b0ff";

    // Navegación directa: evita que el navegador bloquee una ventana emergente.
    window.location.href = whatsappUrl;
  });
});