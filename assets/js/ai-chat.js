(() => {
  const API_URL = window.INNOVO_AI_API_URL || 'https://innovo-marketing.vercel.app/api/chat';
  const lang = (localStorage.getItem('innovo-lang') || navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  const copy = lang === 'en' ? {
    launcher:'Innovo AI', online:'Virtual assistant · Online', welcome:'Hi! I’m Innovo AI. I can help you figure out what your business needs and give you a starting point. What are you looking to build?', placeholder:'Type your message...', send:'Send', quick:['🌐 Website','🤖 AI & automation','🛒 Online store','💻 Custom system'], error:'I couldn’t connect right now. You can message Franklin Aguirre directly on WhatsApp: +1 (240) 437-7959.', typing:'Thinking...'
  } : {
    launcher:'Innovo AI', online:'Asistente virtual · En línea', welcome:'¡Hola! Soy Innovo AI. Puedo ayudarte a definir qué necesita tu negocio y darte un punto de partida. ¿Qué te gustaría construir?', placeholder:'Escribe tu mensaje...', send:'Enviar', quick:['🌐 Página web','🤖 IA y automatización','🛒 Tienda online','💻 Sistema a medida'], error:'No pude conectarme en este momento. Puedes escribirle directamente a Franklin Aguirre por WhatsApp: +1 (240) 437-7959.', typing:'Pensando...'
  };

  const state = { messages: [], open:false, busy:false };
  const el = (tag, attrs = {}, html = '') => { const node=document.createElement(tag); Object.entries(attrs).forEach(([k,v]) => node.setAttribute(k,v)); node.innerHTML=html; return node; };

  const launcher = el('button',{id:'innovo-ai-launcher','aria-label':copy.launcher},`<span class="innovo-ai-dot"></span><span>${copy.launcher}</span>`);
  const panel = el('section',{id:'innovo-ai-panel','aria-label':'Innovo AI'},`<div class="innovo-ai-head"><div class="innovo-ai-title"><span class="innovo-ai-dot"></span><div><strong>Innovo AI</strong><small>${copy.online}</small></div></div><button class="innovo-ai-close" aria-label="Close">×</button></div><div class="innovo-ai-messages"></div><div class="innovo-ai-quick"></div><form class="innovo-ai-form"><input class="innovo-ai-input" autocomplete="off" placeholder="${copy.placeholder}" maxlength="3000"/><button class="innovo-ai-send" type="submit" aria-label="${copy.send}">→</button></form>`);
  document.body.append(launcher,panel);

  const messagesEl = panel.querySelector('.innovo-ai-messages');
  const quickEl = panel.querySelector('.innovo-ai-quick');
  const input = panel.querySelector('.innovo-ai-input');
  const send = panel.querySelector('.innovo-ai-send');

  function scrollBottom(){ messagesEl.scrollTop=messagesEl.scrollHeight; }
  function addMessage(role,text){ const node=el('div',{class:`innovo-ai-msg ${role}`}); node.textContent=text; messagesEl.appendChild(node); scrollBottom(); return node; }
  function addTyping(){ const node=el('div',{class:'innovo-ai-msg bot'},`<span class="innovo-ai-typing"><i></i><i></i><i></i></span>`); messagesEl.appendChild(node); scrollBottom(); return node; }
  function open(){ state.open=true; panel.classList.add('open'); if(!messagesEl.children.length){ addMessage('bot',copy.welcome); state.messages.push({role:'assistant',content:copy.welcome}); } input.focus(); }
  function close(){ state.open=false; panel.classList.remove('open'); }
  function setBusy(value){ state.busy=value; input.disabled=value; send.disabled=value; }

  copy.quick.forEach(label => { const b=el('button',{type:'button'},label); b.addEventListener('click',()=>{ input.value=label.replace(/^\S+\s/,''); input.focus(); panel.querySelector('.innovo-ai-form').requestSubmit(); }); quickEl.appendChild(b); });

  launcher.addEventListener('click',()=>state.open ? close() : open());
  panel.querySelector('.innovo-ai-close').addEventListener('click',close);

  panel.querySelector('.innovo-ai-form').addEventListener('submit', async event => {
    event.preventDefault();
    const text=input.value.trim();
    if(!text || state.busy) return;
    addMessage('user',text); state.messages.push({role:'user',content:text}); input.value=''; setBusy(true); const typing=addTyping();
    try {
      const response=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:state.messages,lang})});
      const data=await response.json().catch(()=>({}));
      typing.remove();
      if(!response.ok || !data.message) throw new Error(data.error || 'Request failed');
      addMessage('bot',data.message); state.messages.push({role:'assistant',content:data.message});
    } catch(error) {
      typing.remove(); addMessage('bot',copy.error);
    } finally { setBusy(false); input.focus(); }
  });

  const advisorScript = document.createElement('script');
  advisorScript.src = 'assets/js/advisor.js?v=20260905-1';
  document.body.appendChild(advisorScript);
})();
