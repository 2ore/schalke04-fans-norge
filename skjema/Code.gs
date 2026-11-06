/**
 * SCHALKE 04 FANS NORGE – innmeldingsskjema → Google-regneark
 *
 * Denne koden limes inn i Google Sheets (Utvidelser → Apps Script).
 * Den tar imot innmeldinger fra nettsiden og legger dem som en ny rad
 * i arket «Medlemmer». Regnearket kan lastes ned som Excel-fil.
 *
 * Fremgangsmåten står i README.md, avsnittet «Innmeldingsskjema → regneark».
 */

// Valgfritt: skriv inn en e-postadresse hvis du vil ha en e-post hver gang
// noen melder seg inn. La stå tom ('') for å slippe e-post.
const VARSLE_EPOST = '';

const ARKNAVN = 'Medlemmer';
const OVERSKRIFTER = ['Tidspunkt', 'Navn', 'E-post', 'Mobil', 'Bosted', 'Hvorfor Schalke', 'Samtykke', 'Betalt?'];

/** Tar imot innmeldingen fra nettsiden. */
function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    // Skjult felt som bare roboter fyller ut: ignorer stille.
    if (p.website) return svar_(true);

    const navn   = rens_(p.name, 100);
    const epost  = rens_(p.email, 150);
    const mobil  = rens_(p.phone, 30);
    const bosted = rens_(p.city, 100);
    const hvorfor = rens_(p.why, 500);

    if (!navn || !/^\S+@\S+\.\S+$/.test(epost) || !bosted || p.consent !== 'ja') {
      return svar_(false);
    }

    const lås = LockService.getScriptLock();
    lås.waitLock(15000);
    try {
      const ark = hentArk_();
      const rad = ark.getLastRow() + 1;
      // Gjør cellene til ren tekst, så ingenting blir tolket som formel.
      ark.getRange(rad, 2, 1, 6).setNumberFormat('@');
      ark.getRange(rad, 1, 1, 8).setValues([[new Date(), navn, epost, mobil, bosted, hvorfor, 'Ja', '']]);
      ark.getRange(rad, 1).setNumberFormat('dd.mm.yyyy hh:mm');
    } finally {
      lås.releaseLock();
    }

    if (VARSLE_EPOST) {
      try {
        MailApp.sendEmail(VARSLE_EPOST, 'Ny innmelding: ' + navn,
          'Ny innmelding til Schalke 04 Fans Norge\n\n' +
          'Navn: ' + navn + '\nE-post: ' + epost + '\nMobil: ' + (mobil || '–') +
          '\nBosted: ' + bosted + '\nHvorfor Schalke: ' + (hvorfor || '–') +
          '\n\nSe hele listen i regnearket.');
      } catch (mailFeil) { /* e-postvarsel er valgfritt; innmeldingen er allerede lagret */ }
    }
    return svar_(true);
  } catch (feil) {
    return svar_(false);
  }
}

/** Gjør at du kan teste adressen i nettleseren: den skal vise «OK». */
function doGet() {
  return ContentService.createTextOutput('OK – skjemaet er i drift.');
}

function hentArk_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let ark = ss.getSheetByName(ARKNAVN);
  if (!ark) {
    ark = ss.insertSheet(ARKNAVN, 0);
    ss.setSpreadsheetTimeZone('Europe/Oslo');
  }
  if (ark.getLastRow() === 0) {
    ark.getRange(1, 1, 1, OVERSKRIFTER.length).setValues([OVERSKRIFTER]).setFontWeight('bold').setBackground('#004D9D').setFontColor('#FFFFFF');
    ark.setFrozenRows(1);
    ark.setColumnWidths(1, 1, 130);
    ark.setColumnWidths(2, 3, 190);
    ark.setColumnWidth(5, 130);
    ark.setColumnWidth(6, 320);
  }
  return ark;
}

function rens_(verdi, maks) {
  return String(verdi == null ? '' : verdi).replace(/[\r\n\t]+/g, ' ').trim().slice(0, maks);
}

function svar_(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok })).setMimeType(ContentService.MimeType.JSON);
}
