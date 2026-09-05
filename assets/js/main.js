document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  menu?.addEventListener('click', () => { nav?.classList.toggle('open'); menu.setAttribute('aria-expanded', nav?.classList.contains('open') ? 'true' : 'false'); });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));

  const hiddenSections = ['#packages','#solutions','.extras-section','#care','.faq-section','#contact'];
  hiddenSections.forEach(sel => document.querySelector(sel)?.classList.add('chapter-hidden'));

  const hero = document.querySelector('.hero');
  if (hero && !document.getElementById('visualExperience')) {
    const visual = document.createElement('section');
    visual.id = 'visualExperience';
    visual.className = 'section visual-experience';
    visual.innerHTML = `
      <div class="container">
        <div class="section-heading portfolio-heading reveal"><div><p class="eyebrow">EXPERIENCIA INNOVO</p><h2>Menos texto. <span>Más impacto.</span></h2></div><p>Explora una muestra visual de lo que podemos crear para tu negocio.</p></div>
        <div class="experience-grid">
          <a href="#packages" class="experience-card reveal"><img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1100&q=85" alt="Diseño web en laptop"><div><small>01 / WEB</small><h3>Diseño que representa tu marca.</h3><span>Explorar paquetes →</span></div></a>
          <a href="#solutions" class="experience-card reveal"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=85" alt="Tecnología y automatización"><div><small>02 / IA</small><h3>Automatización que te ahorra tiempo.</h3><span>Ver soluciones →</span></div></a>
          <a href="#contact" class="experience-card reveal"><img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1100&q=85" alt="Equipo trabajando en estrategia"><div><small>03 / CRECIMIENTO</small><h3>Experiencias que convierten.</h3><span>Hablemos →</span></div></a>
        </div>
        <div class="showcase-strip reveal"><div class="showcase-copy"><p class="eyebrow">MINI SHOWREEL</p><h3>Así se siente una experiencia digital moderna.</h3><p>Una pequeña pieza interactiva para mostrar movimiento, tecnología y personalidad.</p></div><a class="showcase-video" href="https://www.pexels.com/video/men-using-digital-devices-in-an-office-7989677/" target="_blank" rel="noopener"><div class="showcase-motion"></div><span class="play-button">▶</span><b>Ver video</b></a></div>
      </div>`;
    hero.after(visual);
  }

  const services = document.getElementById('services');
  if (services && !document.getElementById('portfolio')) {
    const portfolio = document.createElement('section');
    portfolio.id = 'portfolio'; portfolio.className = 'section portfolio-section';
    portfolio.innerHTML = `<div class="container"><div class="section-heading portfolio-heading reveal"><div><p class="eyebrow">INSPIRACIÓN DIGITAL</p><h2>Así puede verse <span>tu próxima web.</span></h2></div><p>Una muestra visual del estilo de experiencias que podemos construir.</p></div><div class="portfolio-wrap reveal"><button class="carousel-arrow prev" aria-label="Anterior">←</button><div class="portfolio-track"><article class="portfolio-slide active"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85" alt="Equipo colaborando"><div class="portfolio-overlay"><span>01 / ESTRATEGIA</span><h3>Una marca que transmite confianza desde el primer vistazo.</h3><p>Diseño, contenido y conversión en una sola experiencia.</p></div></article><article class="portfolio-slide"><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85" alt="Espacio de trabajo moderno"><div class="portfolio-overlay"><span>02 / EXPERIENCIA</span><h3>Diseño limpio, moderno y pensado para tus clientes.</h3><p>La información justa, en el momento correcto.</p></div></article><article class="portfolio-slide"><img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=85" alt="Equipo tecnológico"><div class="portfolio-overlay"><span>03 / TECNOLOGÍA</span><h3>Herramientas digitales que trabajan contigo.</h3><p>Desde formularios hasta automatizaciones y sistemas.</p></div></article></div><button class="carousel-arrow next" aria-label="Siguiente">→</button></div><div class="carousel-bottom"><div class="carousel-dots"><button class="dot active"></button><button class="dot"></button><button class="dot"></button></div><a href="#contact" class="text-link">Quiero algo así →</a></div></div>`;
    services.after(portfolio);
    const slides=[...portfolio.querySelectorAll('.portfolio-slide')],dots=[...portfolio.querySelectorAll('.dot')]; let current=0,timer;
    const show=n=>{current=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===current));dots.forEach((d,i)=>d.classList.toggle('active',i===current));};
    const auto=()=>{clearInterval(timer);timer=setInterval(()=>show(current+1),5200)};
    portfolio.querySelector('.prev')?.addEventListener('click',()=>{show(current-1);auto()});portfolio.querySelector('.next')?.addEventListener('click',()=>{show(current+1);auto()});dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);auto()}));show(0);auto();
  }

  const chapterMap = { '#services':['#services','#visualExperience','#portfolio','#process'], '#process':['#process'], '#packages':['#packages'], '#solutions':['#solutions','.extras-section'], '#care':['#care'], '#contact':['.faq-section','#contact'] };
  const showChapter = hash => {
    const targets = chapterMap[hash];
    if (!targets) return;
    hiddenSections.forEach(sel => document.querySelector(sel)?.classList.add('chapter-hidden'));
    targets.forEach(sel => document.querySelector(sel)?.classList.remove('chapter-hidden'));
    const target = document.querySelector(hash === '#services' ? '#services' : targets[0]);
    if (target) setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),30);
  };
  document.querySelectorAll('.nav-links a[href^="#"], .experience-card[href^="#"], .text-link[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const hash=a.getAttribute('href');if(chapterMap[hash]){e.preventDefault();showChapter(hash);}}));

  const form=document.getElementById('quoteForm');
  if(form){form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form),get=n=>String(data.get(n)||'').trim()||'No indicado';const msg=`Hola, Innovo Marketing. 👋\n\nQuiero solicitar una cotización.\n\n*Datos del cliente*\nNombre: ${get('name')}\nNegocio: ${get('business')}\nCorreo: ${get('email')}\nTeléfono: ${get('phone')}\nTipo de negocio: ${get('industry')}\nPaquete: ${get('package')}\n\n*Proyecto*\n${get('project')}`;const status=document.getElementById('formMessage');if(status)status.textContent='Abriendo WhatsApp...';window.location.assign('https://wa.me/50375766631?text='+encodeURIComponent(msg));});}

  document.querySelectorAll('.service-card,.pricing-card,.solution-cards>div,.care-card,.experience-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`);}));

  const reveal=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});reveal.forEach(el=>observer.observe(el));}else reveal.forEach(el=>el.classList.add('visible'));
});
