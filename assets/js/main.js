document.addEventListener("DOMContentLoaded", () => {
  // Carga la capa visual interactiva sin depender del HTML principal.
  if (!document.querySelector('link[data-innovo-interactive]')) {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "assets/css/interactive.css?v=20260905-1";
    style.dataset.innovoInteractive = "true";
    document.head.appendChild(style);
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  menuButton?.addEventListener("click", () => {
    nav?.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", nav?.classList.contains("open") ? "true" : "false");
  });
  document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => nav?.classList.remove("open")));

  // Cotización -> WhatsApp
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(quoteForm);
      const get = name => String(data.get(name) || "").trim() || "No indicado";
      const message = `Hola, Innovo Marketing. 👋\n\nQuiero solicitar una cotización para mi negocio.\n\n*Datos del cliente*\nNombre: ${get("name")}\nNegocio: ${get("business")}\nCorreo: ${get("email")}\nTeléfono: ${get("phone")}\nTipo de negocio: ${get("industry")}\nPaquete de interés: ${get("package")}\n\n*Detalles del proyecto*\n${get("project")}\n\nEnviado desde el sitio web de Innovo Marketing.`;
      const whatsappUrl = "https://wa.me/50375766631?text=" + encodeURIComponent(message);
      const msg = document.getElementById("formMessage");
      if (msg) msg.textContent = "¡Perfecto! Abriendo WhatsApp para enviar tu solicitud...";
      window.location.assign(whatsappUrl);
    });
  }

  // Selección rápida de paquete
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

  // Nueva sección visual: portafolio + carrusel interactivo.
  const services = document.getElementById("services");
  if (services && !document.getElementById("portfolio")) {
    const portfolio = document.createElement("section");
    portfolio.className = "section portfolio-section";
    portfolio.id = "portfolio";
    portfolio.innerHTML = `
      <div class="container">
        <div class="section-heading portfolio-heading reveal">
          <div>
            <p class="eyebrow">INSPIRACIÓN DIGITAL</p>
            <h2>Ideas que se ven bien.<br><span>Experiencias que se sienten.</span></h2>
          </div>
          <p>Una muestra del tipo de experiencias visuales que podemos crear para marcas, negocios y profesionales.</p>
        </div>
        <div class="portfolio-wrap reveal">
          <button class="carousel-arrow prev" aria-label="Proyecto anterior">←</button>
          <div class="portfolio-track" aria-live="polite">
            <article class="portfolio-slide active">
              <img src="https://images.unsplash.com/photo-1636647677481-f134fda3f408?auto=format&fit=crop&fm=jpg&q=80&w=1600" alt="Equipo de marketing trabajando en una estrategia digital" loading="lazy">
              <div class="portfolio-overlay"><span>01 / Estrategia</span><h3>Marcas con una presencia digital que transmite confianza.</h3><p>Diseño, contenido y conversión en una sola experiencia.</p></div>
            </article>
            <article class="portfolio-slide">
              <img src="https://images.unsplash.com/photo-1603195827187-459ab02554a0?auto=format&fit=crop&fm=jpg&q=80&w=1600" alt="Equipo colaborando en un proyecto digital" loading="lazy">
              <div class="portfolio-overlay"><span>02 / Desarrollo</span><h3>Webs modernas pensadas para conectar con clientes.</h3><p>Diseños adaptables, claros y preparados para crecer.</p></div>
            </article>
            <article class="portfolio-slide">
              <img src="https://images.unsplash.com/photo-1782898669223-ab17b600d486?auto=format&fit=crop&fm=jpg&q=80&w=1600" alt="Desarrollo de una interfaz web en laptop" loading="lazy">
              <div class="portfolio-overlay"><span>03 / Tecnología</span><h3>Interfaces que convierten visitas en oportunidades.</h3><p>Experiencias digitales rápidas, funcionales e interactivas.</p></div>
            </article>
            <article class="portfolio-slide">
              <img src="https://images.unsplash.com/photo-1781871670335-660e05ae7406?auto=format&fit=crop&fm=jpg&q=80&w=1600" alt="Laptop y teléfono en un espacio de trabajo digital" loading="lazy">
              <div class="portfolio-overlay"><span>04 / Mobile</span><h3>Tu negocio también debe verse increíble desde el celular.</h3><p>Diseño responsive para acompañar a tus clientes donde estén.</p></div>
            </article>
          </div>
          <button class="carousel-arrow next" aria-label="Siguiente proyecto">→</button>
        </div>
        <div class="carousel-bottom">
          <div class="carousel-dots" role="tablist" aria-label="Proyectos">
            <button class="dot active" aria-label="Ver proyecto 1"></button><button class="dot" aria-label="Ver proyecto 2"></button><button class="dot" aria-label="Ver proyecto 3"></button><button class="dot" aria-label="Ver proyecto 4"></button>
          </div>
          <a href="#contact" class="text-link">Quiero algo así para mi negocio →</a>
        </div>
      </div>`;
    services.after(portfolio);

    const slides = [...portfolio.querySelectorAll(".portfolio-slide")];
    const dots = [...portfolio.querySelectorAll(".dot")];
    let current = 0;
    let timer;
    const showSlide = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    };
    const startAuto = () => { clearInterval(timer); timer = setInterval(() => showSlide(current + 1), 5500); };
    portfolio.querySelector(".prev")?.addEventListener("click", () => { showSlide(current - 1); startAuto(); });
    portfolio.querySelector(".next")?.addEventListener("click", () => { showSlide(current + 1); startAuto(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); startAuto(); }));
    portfolio.querySelector(".portfolio-track")?.addEventListener("mouseenter", () => clearInterval(timer));
    portfolio.querySelector(".portfolio-track")?.addEventListener("mouseleave", startAuto);
    showSlide(0);
    startAuto();
  }

  // Micro-interacción: tarjetas de servicio con efecto de seguimiento del cursor.
  document.querySelectorAll(".service-card, .pricing-card, .solution-cards > div, .care-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  // Animaciones de entrada.
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }
});
