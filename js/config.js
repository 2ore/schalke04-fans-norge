/* =====================================================================
   HER ENDRER DU INNHOLD SOM OFTEST ENDRER SEG
   Rediger teksten mellom "anførselstegnene" ("...") og lagre filen.
   Ikke fjern komma, klammer { } eller anførselstegn.
   ===================================================================== */

const CONFIG = {
  // E-postadressen som medlemsforespørsler sendes til
  email: "medlem@schalke04fans.no",   // TODO: bytt til fanklubbens e-postadresse

  // Kontingenten som vises under «Bli medlem»
  price: "200 kr per år",                    // Skriv f.eks. "200 kr per år" hvis kontingenten er årlig

  // Lenker i bunnen av siden. La stå tomt ("") for å skjule.
  // Eksempel: facebook: "https://www.facebook.com/dinside"
  links: {
    facebook: "https://www.facebook.com/groups/480101425825247",
    instagram: "https://www.instagram.com/fc_schalke_04_norge/"
  }
};

/* ---------------------------------------------------------------------
   TREFF
   Ett treff = ett blokk mellom { og }. Legg til et nytt treff ved å
   kopiere en hel linje (fra { til },) og endre innholdet.

   date:  "ÅÅÅÅ-MM-DDTTT:MM:00+02:00"
          +02:00 brukes om sommeren (sist i mars til sist i oktober)
          +01:00 brukes om vinteren.
          Eksempel: 3. oktober 2026 kl. 15:00 -> "2026-10-03T15:00:00+02:00"
   hours: hvor mange timer treffet varer (brukes i «Legg i kalenderen»)
   title, place, desc: tittel, sted og kort beskrivelse

   Treff som er passert, skjules automatisk. Rekkefølgen har ingen betydning.
   --------------------------------------------------------------------- */

const EVENTS = [
  { date: "2026-12-05T18:00:00+02:00", hours: 3, title: "Julebord og Schalke - Dortmund", place: "Pub i Oslo sentrum (sted bekreftes)", desc: "Supporterklubbens årlige julebord. Alle er velkomne. Sammen ser vi Schalke - Dortmund." },
  { date: "2027-03-24T18:00:00+02:00", hours: 3, title: "Kommende arrangement",     place: "Oslo (sted bekreftes)",               desc: "Mer info om arrangement kommer." },
  { date: "2027-04-21T17:30:00+01:00", hours: 4, title: "Årsmøte",    place: "Oslo (sted bekreftes)",               desc: "Årsmøte først, deretter kamp på storskjerm." }
];
