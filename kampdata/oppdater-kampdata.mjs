// Henter Bundesliga-tabell og Schalkes kampprogram fra football-data.org
// og lagrer dem i js/kampdata.js. Kjøres automatisk av GitHub (se README, del 3).
// Krever miljøvariabelen FOOTBALL_DATA_TOKEN (gratis nøkkel fra football-data.org).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const TOKEN = process.env.FOOTBALL_DATA_TOKEN;
if (!TOKEN) { console.error('Mangler FOOTBALL_DATA_TOKEN. Legg nøkkelen inn som «secret» på GitHub.'); process.exit(1); }

const FIL = new URL('../js/kampdata.js', import.meta.url);
const API = 'https://api.football-data.org/v4';
const LIGA = 'BL1';   // Bundesliga

async function hent(sti) {
  const r = await fetch(API + sti, { headers: { 'X-Auth-Token': TOKEN } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} fra ${sti}`);
  return r.json();
}
const navn = t => (t.shortName || t.name || '?');
const erSchalke = t => t.tla === 'S04' || /schalke/i.test(t.name || '');

const st = await hent(`/competitions/${LIGA}/standings`);
const tot = (st.standings || []).find(s => s.type === 'TOTAL') || (st.standings || [])[0];
if (!tot || !Array.isArray(tot.table) || !tot.table.length) throw new Error('Fant ingen tabell i svaret.');

const tabell = tot.table.map(r => ({
  pos: r.position, team: navn(r.team), p: r.playedGames, w: r.won, d: r.draw, l: r.lost, pts: r.points, me: erSchalke(r.team)
}));
const meId = (tot.table.find(r => erSchalke(r.team)) || {}).team?.id;
if (!meId) throw new Error('Schalke 04 står ikke i Bundesliga-tabellen. Er laget i en annen liga denne sesongen?');

const kamper = await hent(`/competitions/${LIGA}/matches`);
const matches = (kamper.matches || [])
  .filter(m => m.homeTeam?.id === meId || m.awayTeam?.id === meId)
  .map(m => ({
    utc: new Date(m.utcDate).toISOString().replace('.000Z', 'Z'),
    md: m.matchday ?? null,
    home: navn(m.homeTeam), away: navn(m.awayTeam),
    hg: m.score?.fullTime?.home ?? null, ag: m.score?.fullTime?.away ?? null,
    fin: m.status === 'FINISHED',
    h: m.homeTeam?.id === meId
  }))
  .sort((a, b) => a.utc.localeCompare(b.utc));
if (!matches.length) throw new Error('Fant ingen kamper for Schalke.');

const sesong = st.season?.startDate
  ? `${st.season.startDate.slice(0, 4)}/${String(st.season.endDate || '').slice(2, 4)}` : '';

const ny = { season: sesong, source: 'football-data.org', table: tabell, matches };

// Hopp over hvis ingenting har endret seg (unngår unødvendige publiseringer)
function les() {
  if (!existsSync(FIL)) return null;
  const m = readFileSync(FIL, 'utf8').match(/window\.KAMPDATA\s*=\s*([\s\S]*?);\s*$/);
  try { return m ? JSON.parse(m[1]) : null; } catch { return null; }
}
const gammel = les();
if (gammel) { const { updated, ...rest } = gammel; if (JSON.stringify(rest) === JSON.stringify(ny)) { console.log('Ingen endringer.'); process.exit(0); } }

const ut = { updated: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'), ...ny };
const topp = `/* ====================================================================
   KAMPDATA (tabell, kampprogram og form)
   Denne filen oppdateres automatisk av roboten på GitHub.
   Ikke rediger den for hånd. Se README.md, del 3.
   ==================================================================== */
`;
writeFileSync(FIL, topp + 'window.KAMPDATA = ' + JSON.stringify(ut, null, 1) + ';\n');
console.log(`Oppdatert: ${tabell.length} lag, ${matches.length} kamper.`);
