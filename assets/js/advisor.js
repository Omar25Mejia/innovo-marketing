(() => {
  const PHONE = '12404377959';
  const DISPLAY = '+1 (240) 437-7959';
  const lang = (localStorage.getItem('innovo-lang') || navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  const copy = lang === 'en' ? {
    nav:'Franklin Aguirre · Sales Advisor', eyebrow:'U.S. SALES ADVISOR', title:'Franklin Aguirre', role:'Sales Advisor', text:'Your point of contact in the United States. Franklin can answer your questions, understand what your business needs and follow up on your request.', tags:['Personalized attention','Based in the U.S.','WhatsApp support'], button:'Message Franklin on WhatsApp', hours:'Your request goes directly to Franklin.', sectionTitle:'Talk to someone in the U.S.'
  } : {
    nav:'Franklin Aguirre · Asesor de Ventas', eyebrow:'ASESOR DE VENTAS EN EE. UU.', title:'Franklin Aguirre', role:'Asesor de Ventas', text:'Tu punto de contacto en Estados Unidos. Franklin puede responder tus preguntas, entender lo que necesita tu negocio y dar seguimiento a tu solicitud.', tags:['Atención personalizada','En Estados Unidos','Atención por WhatsApp'], button:'Escribirle a Franklin por WhatsApp', hours:'Tu solicitud le llegará directamente a Franklin.', sectionTitle:'Habla con nuestro asesor en EE. UU.'
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const wa = text => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
  const section = (extraClass='') => {
    const el = document.createElement('section');
    el.className = `advisor-section ${extraClass}`;
    el.id = 'franklin';
    el.innerHTML = `<div class="container"><div class="advisor-card"><div class="advisor-avatar" aria-hidden="true">FA</div><div class="advisor-copy"><p class="eyebrow">${copy.eyebrow}</p><h2>${copy.title} <span>· ${copy.role}</span></h2><p>${copy.text}</p><div class="advisor-meta">${copy.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="advisor-inline"><span class="advisor-flag">🇺🇸</span><strong>${DISPLAY}</strong></div></div><div class="advisor-action"><a class="advisor-whatsapp" target="_blank" rel="noopener" href="${wa(lang==='en'?'Hi Franklin, I would like information about Innovo Marketing.':'Hola Franklin, quisiera información sobre Innovo Marketing.')}">💬 ${copy.button}</a><small>${copy.hours}</small></div></div></div>`;
    return el;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const css = document.createElement('link'); css.rel='stylesheet'; css.href='assets/css/advisor.css?v=20260905-1'; document.head.appendChild(css);

    document.querySelectorAll('.nav-links a').forEach(a => {
      if (a.getAttribute('href') === 'soluciones.html') {
        a.href='contacto.html#franklin';
        a.textContent=copy.nav;
        a.classList.remove('nav-cta');
      }
    });

    document.querySelectorAll('a[href*="wa.me/50375766631"]').forEach(a => {
      a.href=wa(lang==='en'?'Hi Franklin, I would like information about Innovo Marketing.':'Hola Franklin, quisiera información sobre Innovo Marketing.');
      a.textContent=lang==='en' ? 'WhatsApp · '+DISPLAY : 'WhatsApp · '+DISPLAY;
    });

    if(location.pathname.endsWith('index.html') || location.pathname.endsWith('/innovo-marketing/') || location.pathname.endsWith('/innovo-marketing')) {
      const hero=document.querySelector('.hero-home');
      if(hero && !document.getElementById('franklin')) hero.insertAdjacentElement('afterend',section());
    }

    if(location.pathname.endsWith('contacto.html')) {
      const contact=document.querySelector('.contact-section');
      if(contact && !document.getElementById('franklin')) contact.insertAdjacentElement('afterend',section('advisor-contact'));
      const form=document.querySelector('#quoteForm');
      if(form && !form.dataset.franklinBound){
        form.dataset.franklinBound='1';
        form.addEventListener('submit', event => {
          event.preventDefault();
          event.stopImmediatePropagation();
          const data=new FormData(form);
          const lines=lang==='en' ? [
            'Hello Franklin, I would like a quote from Innovo Marketing.','',`Name: ${data.get('name')||''}`,`Business: ${data.get('business')||''}`,`Email: ${data.get('email')||''}`,`Phone: ${data.get('phone')||''}`,`Business type: ${data.get('industry')||''}`,`What I need: ${data.get('package')||''}`,`Project: ${data.get('project')||''}`
          ] : [
            'Hola Franklin, quiero solicitar una cotización de Innovo Marketing.','',`Nombre: ${data.get('name')||''}`,`Negocio: ${data.get('business')||''}`,`Correo: ${data.get('email')||''}`,`Teléfono: ${data.get('phone')||''}`,`Tipo de negocio: ${data.get('industry')||''}`,`Qué necesita: ${data.get('package')||''}`,`Proyecto: ${data.get('project')||''}`
          ];
          const message=document.querySelector('#formMessage');
          if(message) message.textContent=lang==='en'?'Opening WhatsApp with your request...':'Abriendo WhatsApp con tu solicitud...';
          window.open(wa(lines.join('\n')),'_blank','noopener');
        }, true);
      }
    }
  });
})();
