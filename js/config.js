/* =====================================================================
   HER ENDRER DU INNHOLD SOM OFTEST ENDRER SEG
   Rediger teksten mellom "anførselstegnene" ("...") og lagre filen.
   Ikke fjern komma, klammer { } eller anførselstegn.
   ===================================================================== */

const CONFIG = {
  // E-postadressen som medlemsforespørsler sendes til
  email: "medlem@schalke04fans.no",   // TODO: bytt til fanklubbens e-postadresse

  // Kontingenten som vises under «Bli medlem»
  price: "200 kr",                    // Skriv f.eks. "200 kr per år" hvis kontingenten er årlig

  // Lenker i bunnen av siden. La stå tomt ("") for å skjule.
  // Eksempel: facebook: "https://www.facebook.com/dinside"
  links: {
    facebook: "",
    instagram: ""
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
  { date: "2026-10-03T15:00:00+02:00", hours: 3, title: "Kampvisning på storskjerm", place: "Pub i Oslo sentrum (sted bekreftes)", desc: "Vi ser Schalke sammen. Kom i blått og hvitt og ta med en venn." },
  { date: "2026-10-24T18:00:00+02:00", hours: 3, title: "Medlemskveld med quiz",     place: "Oslo (sted bekreftes)",               desc: "Schalke-quiz, pizza og god stemning." },
  { date: "2026-11-21T17:30:00+01:00", hours: 4, title: "Årsmøte og kampvisning",    place: "Oslo (sted bekreftes)",               desc: "Årsmøte først, deretter kamp på storskjerm." }
];
