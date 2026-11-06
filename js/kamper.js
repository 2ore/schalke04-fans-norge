/* Schalke 04 Fans Norge – neste kamp, kampprogram, tabell og form.
   Leser js/kampdata.js (oppdateres av roboten, se README del 3).
   Du trenger ikke endre noe her. */
(function () {
  'use strict';
  const D = window.KAMPDATA;
  const sec = document.getElementById('kamper');
  if (!sec || !D || !Array.isArray(D.matches) || !Array.isArray(D.table)) return;   // ingen data: seksjonen forblir skjult

  const $ = id => document.getElementById(id);
  const TZ = 'Europe/Oslo';
  const f = (d, o) => new Intl.DateTimeFormat('nb-NO', Object.assign({ timeZone: TZ }, o)).format(d);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nodots = s => s.replace(/\./g, '');
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const clock = d => f(d, { hour: '2-digit', minute: '2-digit', hour12: false });
  const weekdayShort = d => nodots(f(d, { weekday: 'short' }));
  const dayMonth = d => nodots(f(d, { day: 'numeric' })) + '. ' + nodots(f(d, { month: 'short' }));
  const longDate = d => cap(f(d, { weekday: 'long' })) + ' ' + nodots(f(d, { day: 'numeric' })) + '. ' + f(d, { month: 'long' });

  const GAME_MS = 2.5 * 3600e3;                       // regner en kamp som «pågår» i 2,5 time etter avspark
  const M = D.matches.map(m => Object.assign({}, m, { t: new Date(m.utc).getTime() }))
                     .filter(m => !isNaN(m.t)).sort((a, b) => a.t - b.t);
  const opp = m => (m.h ? m.away : m.home);
  const played = m => m.fin && m.hg != null && m.ag != null;
  const result = m => { const me = m.h ? m.hg : m.ag, th = m.h ? m.ag : m.hg; return me > th ? 's' : me < th ? 't' : 'u'; };
  const LETTER = { s: 'S', u: 'U', t: 'T' }, WORD = { s: 'Seier', u: 'Uavgjort', t: 'Tap' };
  const pill = (m, r, small) => `<span class="pill ${r}${small ? ' sm' : ''}" role="img" aria-label="${WORD[r]} mot ${esc(opp(m))}" title="${WORD[r]} mot ${esc(opp(m))}">${LETTER[r]}</span>`;
  const isDerby = m => /dortmund/i.test(opp(m));
  const nextOf = now => M.find(m => !m.fin && m.t + GAME_MS > now) || null;

  /* ---------- Neste kamp + form ---------- */
  function formHtml() {
    const last = M.filter(played).slice(-5);
    if (!last.length) return '';
    return `<div class="nm-form"><span class="lbl">Form, siste ${last.length} (nyeste til høyre)</span><span class="pills">${last.map(m => pill(m, result(m))).join('')}</span></div>`;
  }
  function renderNext(n, now) {
    const box = $('nextmatch');
    if (!n) {
      box.innerHTML = `<div class="nm-top"><span class="nm-label">Neste kamp</span></div>
        <p class="nm-teams">Kampprogrammet kommer</p>
        <p class="nm-when">Neste kamp vises her så snart datoen er fastsatt.</p>${formHtml()}`;
      return;
    }
    const d = new Date(n.t), live = n.t <= now;
    box.innerHTML = `<div class="nm-top"><span class="nm-label">Neste kamp</span><span>Bundesliga${n.md ? ' · runde ' + esc(n.md) : ''}</span></div>
      <p class="nm-teams">${esc(n.home)} – ${esc(n.away)}</p>
      <p class="nm-when">${esc(longDate(d))} · kl. ${esc(clock(d))}<span class="nm-tag">${n.h ? 'Hjemme' : 'Borte'}</span>${isDerby(n) ? '<span class="nm-tag">Revierderby</span>' : ''}</p>
      ${live ? '<p class="nm-live">Kampen er i gang</p>'
             : '<div class="nm-count" aria-hidden="true"><div><b id="k-d">0</b><span>dager</span></div><div><b id="k-h">0</b><span>timer</span></div><div><b id="k-m">0</b><span>min</span></div></div>'}
      ${formHtml()}`;
    tick(n);
  }
  function tick(n) {
    const dd = $('k-d'); if (!n || !dd) return;
    const diff = Math.max(0, n.t - Date.now());
    dd.textContent = Math.floor(diff / 864e5);
    $('k-h').textContent = Math.floor(diff % 864e5 / 36e5);
    $('k-m').textContent = Math.floor(diff % 36e5 / 6e4);
  }

  /* ---------- Kampprogram ---------- */
  let view = 'up', expanded = false, LIMIT = 5, current = null;
  function row(m, now) {
    const d = new Date(m.t);
    let right = '';
    if (played(m)) right = `<span>${esc(m.hg)}–${esc(m.ag)}</span>${pill(m, result(m), true)}`;
    else if (m.t + GAME_MS <= now) right = '<span>–</span>';
    return `<li class="fx-row"><span class="fx-date"><small>${esc(weekdayShort(d))}</small>${esc(dayMonth(d))}</span>
      <span class="fx-what"><b>${esc(opp(m))}</b><span>kl. ${esc(clock(d))} · ${m.h ? 'Hjemme' : 'Borte'}${isDerby(m) ? ' · Revierderby' : ''}</span></span>
      <span class="fx-res">${right}</span></li>`;
  }
  function renderFx(n) {
    const now = Date.now();
    const up = M.filter(m => !m.fin && m.t + GAME_MS > now && m !== n);
    const done = M.filter(m => m.fin || m.t + GAME_MS <= now).sort((a, b) => b.t - a.t);
    const list = view === 'up' ? up : done;
    const shown = expanded ? list : list.slice(0, LIMIT);
    $('fx-list').innerHTML = shown.length ? shown.map(m => row(m, now)).join('')
      : `<li class="fx-empty">${view === 'up' ? 'Flere kamper vises her når ligaen har satt datoene.' : 'Ingen resultater ennå.'}</li>`;
    const more = $('fx-more');
    more.hidden = list.length <= LIMIT;
    more.textContent = expanded ? 'Vis færre' : `Vis alle (${list.length})`;
  }
  document.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
    view = b.dataset.v; expanded = false;
    document.querySelectorAll('.seg button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderFx(current);
  }));
  $('fx-more').addEventListener('click', () => { expanded = !expanded; renderFx(current); });

  /* ---------- Kalenderfil (.ics) ---------- */
  $('fx-ics').addEventListener('click', () => {
    const z = t => new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const now = Date.now(), stamp = z(now);
    const ev = M.filter(m => !m.fin && m.t + GAME_MS > now).map(m => [
      'BEGIN:VEVENT', `UID:s04-${z(m.t)}@schalke04fansnorge`, `DTSTAMP:${stamp}`,
      `DTSTART:${z(m.t)}`, `DTEND:${z(m.t + 2 * 3600e3)}`,
      `SUMMARY:${m.home} – ${m.away} (Bundesliga)`, m.md ? `DESCRIPTION:Bundesliga, runde ${m.md}` : 'DESCRIPTION:Bundesliga', 'END:VEVENT'].join('\r\n'));
    const text = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Schalke 04 Fans Norge//Kamper//NO', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:Schalke 04 – kamper']
      .concat(ev, ['END:VCALENDAR']).join('\r\n') + '\r\n';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }));
    a.download = 'schalke04-kamper.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  });

  /* ---------- Tabell ---------- */
  function renderTable() {
    $('m-table').innerHTML = '<thead><tr><th scope="col"><span class="sr">Plass</span><span aria-hidden="true">#</span></th><th scope="col">Lag</th><th scope="col">K</th><th scope="col">S</th><th scope="col">U</th><th scope="col">T</th><th scope="col">P</th></tr></thead><tbody>'
      + D.table.map(r => `<tr${r.me ? ' class="me"' : ''}><td>${esc(r.pos)}</td><td>${esc(r.team)}</td><td>${esc(r.p)}</td><td>${esc(r.w)}</td><td>${esc(r.d)}</td><td>${esc(r.l)}</td><td>${esc(r.pts)}</td></tr>`).join('') + '</tbody>';
    if (D.season) $('season').textContent = D.season;
  }

  /* ---------- Bunnnotat ---------- */
  function renderNote() {
    const parts = [];
    if (D.updated) { const u = new Date(D.updated); if (!isNaN(u)) parts.push('Sist oppdatert ' + f(u, { day: 'numeric', month: 'long', year: 'numeric' })); }
    if (D.source) parts.push('Kilde: ' + D.source);
    $('m-note').textContent = parts.join(' · ');
  }

  /* ---------- Start ---------- */
  let lastKey;                                          // hvilken kamp programmet sist ble tegnet for
  function refresh() {
    const now = Date.now(), n = nextOf(now), key = n ? n.utc : null;
    current = n;
    renderNext(n, now);
    if (key !== lastKey) { lastKey = key; renderFx(n); }  // tegn programmet på nytt bare når «neste kamp» byttes
  }
  renderTable(); renderNote();
  sec.hidden = false; const nav = $('nav-kamper'); if (nav) nav.hidden = false;
  refresh();
  setInterval(refresh, 30000);
})();
