/* Schalke 04 Fans Norge – logikk (nedtelling, skjema, grubelykt).
   Innhold som e-post, pris og treff endres i js/config.js, ikke her. */

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = (d, o) => new Intl.DateTimeFormat('nb-NO', Object.assign({timeZone:'Europe/Oslo'}, o)).format(d);
const dayNum = d => fmt(d, {day:'numeric'}).replace('.', '');
const pad = n => String(n).padStart(2,'0');

/* ---- Config i DOM ---- */
document.getElementById('price').textContent = CONFIG.price;
const fm = document.getElementById('faq-mail');
fm.href = 'mailto:' + CONFIG.email; fm.textContent = CONFIG.email;
const fl = document.getElementById('foot-links');
fl.innerHTML = `<a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>` +
  (CONFIG.links.facebook ? `<a href="${esc(CONFIG.links.facebook)}" target="_blank" rel="noopener">Facebook</a>` : '') +
  (CONFIG.links.instagram ? `<a href="${esc(CONFIG.links.instagram)}" target="_blank" rel="noopener">Instagram</a>` : '');

/* ---- Events + nedtelling ---- */
let timer = null;
function calUrl(e){
  const s = new Date(e.date), en = new Date(s.getTime() + (e.hours||2)*3600e3);
  const f = d => d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=' + encodeURIComponent(e.title + ' – Schalke 04 Fans Norge')
    + '&dates=' + f(s) + '/' + f(en)
    + '&details=' + encodeURIComponent(e.desc || '')
    + '&location=' + encodeURIComponent(e.place || '');
}
function renderEvents(){
  clearInterval(timer);
  const root = document.getElementById('events');
  const now = Date.now();
  const up = EVENTS.map(e => Object.assign({}, e, {t:new Date(e.date)})).filter(e => e.t > now).sort((a,b) => a.t - b.t);

  if(!up.length){
    root.innerHTML = `<div class="empty"><h3 class="sub">Ingen treff planlagt akkurat nå</h3><p>Meld deg inn, så får du beskjed først når neste treff er klart.</p><a class="btn on-paper" href="#medlem">Bli medlem</a></div>`;
    return;
  }
  const [n, ...rest] = up;
  const timeStr = fmt(n.t, {hour:'2-digit', minute:'2-digit', hour12:false});
  root.innerHTML = `
    <article class="ticket" aria-label="Neste treff">
      <div class="stub">
        <div class="wd">${esc(fmt(n.t,{weekday:'long'}))}</div>
        <div class="dd">${esc(dayNum(n.t))}</div>
        <div class="mm">${esc(fmt(n.t,{month:'long'}))}</div>
      </div>
      <div class="tmain">
        <h3>${esc(n.title)}</h3>
        <p class="meta">Kl. ${esc(timeStr)}</p>
        <p class="meta"><span>${esc(n.place)}</span></p>
        <p class="desc">${esc(n.desc||'')}</p>
        <div class="count" aria-hidden="true">
          <div><b id="c-d">0</b><span>dager</span></div>
          <div><b id="c-h">00</b><span>timer</span></div>
          <div><b id="c-m">00</b><span>min</span></div>
          <div><b id="c-s">00</b><span>sek</span></div>
        </div>
        <div class="actions"><a class="btn on-paper small" href="${calUrl(n)}" target="_blank" rel="noopener">Legg i kalenderen</a></div>
      </div>
    </article>
    ${rest.length ? `<h3 class="sub">Flere treff</h3>
    <ul class="later">${rest.map(e => `
      <li>
        <span class="when">${esc(dayNum(e.t))}. ${esc(fmt(e.t,{month:'short'}).replace('.',''))}</span>
        <span class="what">${esc(e.title)}<span class="where">Kl. ${esc(fmt(e.t,{hour:'2-digit',minute:'2-digit',hour12:false}))} · ${esc(e.place)}</span></span>
      </li>`).join('')}</ul>` : ''}`;

  const tick = () => {
    const diff = n.t - Date.now();
    if(diff <= 0){ renderEvents(); return; }
    const d = Math.floor(diff/864e5), h = Math.floor(diff%864e5/36e5), m = Math.floor(diff%36e5/6e4), s = Math.floor(diff%6e4/1e3);
    document.getElementById('c-d').textContent = d;
    document.getElementById('c-h').textContent = pad(h);
    document.getElementById('c-m').textContent = pad(m);
    document.getElementById('c-s').textContent = pad(s);
  };
  tick();
  timer = setInterval(tick, 1000);
}
renderEvents();

/* ---- Medlemsskjema (åpner e-post med ferdig utfylt melding) ---- */
document.getElementById('join').addEventListener('submit', ev => {
  ev.preventDefault();
  const f = ev.target, err = document.getElementById('err'), sent = document.getElementById('sent');
  const name = f.name.value.trim(), email = f.email.value.trim(), city = f.city.value.trim();
  const problems = [];
  if(!name) problems.push('navn');
  if(!/^\S+@\S+\.\S+$/.test(email)) problems.push('en gyldig e-postadresse');
  if(!city) problems.push('bosted');
  if(!document.getElementById('f-ok').checked) problems.push('samtykke til at vi lagrer opplysningene');
  if(problems.length){
    err.style.display = 'block';
    err.textContent = 'Du mangler: ' + problems.join(', ') + '.';
    return;
  }
  err.style.display = 'none';
  const subject = 'Medlemskap i Schalke 04 Fans Norge';
  const body = ['Hei!','','Jeg vil gjerne bli medlem.','',
    'Navn: ' + name, 'E-post: ' + email, 'Mobil: ' + (f.phone.value.trim() || '–'), 'Bosted: ' + city,
    'Hvorfor Schalke: ' + (f.why.value.trim() || '–'), '', 'Glück auf!'].join('\n');
  sent.innerHTML = `<p><strong>E-postprogrammet ditt åpnes med søknaden ferdig utfylt.</strong> Trykk send der, så tar vi kontakt.</p>
    <p>Åpnet ingenting? Send navn, e-post og bosted til <a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>.</p>`;
  sent.classList.add('show');
  window.location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});

/* ---- Grubelykta i hero ---- */
(function(){
  const hero = document.querySelector('.hero'), lamp = document.querySelector('.lamp');
  lamp.querySelector('.lit').innerHTML = lamp.querySelector('.dim').innerHTML; // lys kopi av overskriften
  let moved = false, raf = 0;
  const place = (cx, cy) => {
    const lr = lamp.getBoundingClientRect(), hr = hero.getBoundingClientRect();
    lamp.style.setProperty('--lx', (cx - lr.left) + 'px');
    lamp.style.setProperty('--ly', (cy - lr.top) + 'px');
    hero.style.setProperty('--gx', (cx - hr.left) + 'px');
    hero.style.setProperty('--gy', (cy - hr.top) + 'px');
  };
  const rest = () => { const r = lamp.getBoundingClientRect(); return [r.left + r.width*0.32, r.top + r.height*0.5]; };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduce){ place(...rest()); }
  else {
    const t0 = performance.now(), dur = 1700;
    const [tx, ty] = rest();
    const startX = lamp.getBoundingClientRect().left - 260;
    const step = now => {
      if(moved) return;
      const p = Math.min(1, (now - t0)/dur), e = 1 - Math.pow(1 - p, 3);
      place(startX + (tx - startX)*e, ty);
      if(p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }
  hero.addEventListener('pointermove', e => { moved = true; cancelAnimationFrame(raf); place(e.clientX, e.clientY); });
  addEventListener('resize', () => { if(!moved) place(...rest()); });
})();
