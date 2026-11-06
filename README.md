# Schalke 04 Fans Norge – nettside

Nettsiden til Schalke 04 Fans Norge. Siden ligger på Vercel og henter filene fra GitHub. Hver gang du lagrer en endring på GitHub, oppdateres nettsiden av seg selv etter cirka ett minutt.

**Innhold**

| Fil | Hva det er |
|---|---|
| `js/config.js` | **E-post, kontingent, lenker, treff og skjemaadresse.** Den du oftest endrer |
| `index.html` | All annen tekst på siden |
| `css/style.css` | Farger og utseende |
| `js/main.js` | Nedtelling, skjema og animasjon. Du trenger ikke røre den |
| `js/kamper.js` | Viser neste kamp, kampprogram, tabell og form. Du trenger ikke røre den |
| `js/kampdata.js` | Tallene som vises under «Kampene». Oppdateres av roboten, ikke rediger selv |
| `kampdata/` | Roboten som henter kampdata (se del 3) |
| `skjema/Code.gs` | Koden som lagrer innmeldinger i regnearket (brukes bare én gang, se del 2) |
| `img/`, `favicon.ico` | Logo og ikoner |

---

## 1. Slik oppdaterer du siden

1. Gå til [github.com](https://github.com) og logg inn.
2. Trykk på **profilbildet** øverst til høyre og velg **Your repositories**. Åpne `schalke04-fans-norge`.
3. Klikk på filen du vil endre, for eksempel `js/config.js`. Mapper åpner du ved å klikke på dem.
4. Trykk på **blyantikonet** (Edit this file) øverst til høyre i filen.
5. Endre teksten. Trykk Ctrl+F (Cmd+F på Mac) for å søke etter teksten du vil endre.
6. Trykk den grønne knappen **Commit changes…** øverst til høyre, og trykk **Commit changes** en gang til i vinduet som åpnes.
7. Vent cirka ett minutt og åpne siden. Trykk Ctrl+F5 (Cmd+Shift+R på Mac) for å se den nye versjonen.

**Gjorde du en feil?** Åpne filen og trykk **History**. Der ligger alle tidligere versjoner. Åpne en gammel versjon, kopier teksten og lim den inn i filen igjen.

### Hva du endrer hvor

| Du vil endre | Fil | Søk etter |
|---|---|---|
| Nytt treff, endre eller fjerne treff | `js/config.js` | `EVENTS` |
| E-postadresse | `js/config.js` | `email` |
| Kontingent | `js/config.js` | `price` |
| Facebook og Instagram | `js/config.js` | `links` |
| Overskrift på forsiden | `index.html` | `Glück auf` |
| Teksten under overskriften | `index.html` | `Fanklubben for` |
| De tre stegene under «Bli medlem» | `index.html` | `Send inn skjemaet` |
| Tekst under «Om oss» | `index.html` | `Blått og hvitt` |
| Ordlisten | `index.html` | `Knappen` |
| Spørsmål og svar | `index.html` | `Må jeg bo i Oslo` |
| Farger | `css/style.css` | `:root` (øverst) |
| Tabell, kampprogram og form | Roboten, se del 3 | |

### Slik legger du til et treff

Åpne `js/config.js`, kopier én hel linje i `EVENTS` (fra `{` til `},`) og lim den inn under. Endre innholdet:

```
{ date: "2027-05-08T18:00:00+02:00", hours: 3, title: "Kampvisning", place: "Oslo", desc: "Kort beskrivelse." },
```

- Datoformatet er `år-måned-dagTtime:minutt:00`.
- Bruk `+02:00` om sommeren (sist i mars til sist i oktober) og `+01:00` om vinteren.
- `hours` er hvor mange timer treffet varer. Det brukes bare i «Legg i kalenderen».
- Treff som er passert forsvinner av seg selv. Rekkefølgen har ingen betydning.

### Regler for å ikke ødelegge noe

- Endre bare selve teksten. Ikke slett tegn som `< > { } ( ) " , ;`.
- I `index.html` står tekst mellom `>` og `<`, for eksempel `<p>Dette kan du endre.</p>`.
- I `config.js` står tekst mellom anførselstegn. Ikke fjern dem. Bruk «norske» tegn hvis du trenger anførselstegn inni en tekst.

### La flere hjelpe til

På GitHub: **Settings → Collaborators → Add people**. Skriv inn brukernavnet til den du vil gi tilgang.

---

## 2. Innmeldingsskjema → regneark

Når noen melder seg inn, havner navn, e-post, mobil, bosted og svaret på «Hvorfor Schalke?» som en ny rad i et Google-regneark. Tidspunkt og samtykke lagres også. Regnearket kan lastes ned som Excel-fil når du vil ha det.

Dette gjør du **én gang**. Det tar cirka 10 minutter og koster ingenting.

1. **Lag regnearket.** Gå til [sheets.google.com](https://sheets.google.com) og logg inn. Bruk helst en Google-konto som fanklubben eier, ikke en privat (se del 3). Lag et nytt, tomt regneark og kall det «Medlemmer – Schalke 04 Fans Norge».
2. **Åpne kodeeditoren.** Velg **Utvidelser → Apps Script** i menyen.
3. **Lim inn koden.** Slett alt som står der. Åpne `skjema/Code.gs` fra denne mappen, kopier hele innholdet og lim det inn. Trykk **Lagre** (diskettikonet).
4. **(Valgfritt) e-postvarsel.** Vil du ha en e-post hver gang noen melder seg inn, skriver du e-postadressen din mellom anførselstegnene på linjen `VARSLE_EPOST`. Lagre på nytt.
5. **Publiser.** Trykk **Publiser** (Deploy) øverst til høyre og velg **Ny implementering** (New deployment). Trykk på tannhjulet ved «Velg type» og velg **Nettapp** (Web app). Fyll inn:
   - **Kjør som / Execute as:** Meg (Me)
   - **Hvem har tilgang / Who has access:** Alle (Anyone)

   Trykk **Publiser**.
6. **Gi tilgang.** Google ber om tillatelse. Velg kontoen din. Du får en advarsel om at appen ikke er verifisert. Det er normalt, siden du har laget koden selv. Trykk **Avansert** (Advanced), deretter **Gå til … (utrygt)**, og trykk **Tillat**.
7. **Kopier adressen.** Du får en «Nettapp-URL» som slutter på `/exec`. Kopier den.
8. **Legg den inn på nettsiden.** Åpne `js/config.js` på GitHub (se del 1) og lim adressen mellom anførselstegnene på linjen `formUrl: ""`. Lagre med **Commit changes**.
9. **Test.** Åpne adressen fra punkt 7 i nettleseren. Du skal se «OK». Send så en testinnmelding fra nettsiden. Etter få sekunder dukker en ny rad opp i arket «Medlemmer». Slett testraden etterpå.

**Laste ned som Excel:** Åpne regnearket og velg **Fil → Last ned → Microsoft Excel (.xlsx)**.

**Kolonnen «Betalt?»** er tom. Fyll inn «Ja» etter hvert som kontingenten kommer inn.

**Endrer du koden senere:** Trykk **Publiser → Administrer implementeringer**, trykk blyantikonet, velg **Ny versjon** og publiser. Adressen forblir den samme.

**Hvis noe ikke virker:** Sjekk at «Hvem har tilgang» står på «Alle», og at adressen i `config.js` er kopiert helt (fra `https://` til `/exec`). Så lenge `formUrl` er tom, åpner skjemaet e-postprogrammet i stedet.

---

## 3. Kampene: tabell, kampprogram og form

Under «Kampene» på siden vises neste kamp med nedtelling, Schalkes form, kampprogram, Bundesliga-tabellen og en knapp som legger kampene i kalenderen. Alle tider vises i norsk tid, og sommer- og vintertid håndteres automatisk.

Tallene ligger i `js/kampdata.js`. Fra start inneholder filen tabellen og kampprogrammet slik de var **6. november 2026**. Uten roboten under blir de ikke oppdatert, og tabellen blir fort gammel. Roboten henter nye tall hver tredje time og publiserer siden på nytt når noe har endret seg.

Dette gjør du **én gang**:

1. **Få en gratis nøkkel.** Gå til [football-data.org/client/register](https://www.football-data.org/client/register) og registrer deg. Du får en nøkkel (token) på e-post.
2. **Legg nøkkelen inn på GitHub.** I repositoryet: **Settings → Secrets and variables → Actions → New repository secret**. Skriv `FOOTBALL_DATA_TOKEN` i **Name**, lim nøkkelen i **Secret** og trykk **Add secret**.
3. **Opprett roboten.** Trykk **Add file → Create new file**. Skriv dette i filnavnfeltet, med skråstrekene, så lager GitHub mappene selv:
   `.github/workflows/oppdater-kampdata.yml`
   Åpne `kampdata/oppdater-kampdata.yml` i denne mappen, kopier hele innholdet og lim det inn. Trykk **Commit changes**. (Mapper som starter med punktum er skjult på Mac, og derfor lager du filen slik i stedet for å laste den opp.)
4. **Kjør den første gangen.** Gå til fanen **Actions**, velg **Oppdater kampdata** i listen til venstre og trykk **Run workflow**. Spør GitHub om du vil slå på arbeidsflyter, svarer du ja.
5. **Sjekk resultatet.** Etter cirka et minutt skal kjøringen ha grønn hake, og filen `js/kampdata.js` har fått en ny versjon («Oppdater kampdata»). Siden oppdateres av Vercel et minutt senere. Nederst under «Kampene» står det da «Kilde: football-data.org».

**Hvis kjøringen blir rød:** Åpne den og les feilmeldingen.
- «Mangler FOOTBALL_DATA_TOKEN» betyr at nøkkelen ikke er lagt inn riktig (punkt 2).
- «403» betyr at nøkkelen er feil eller at gratisplanen ikke dekker Bundesliga.
- Står det noe om at roboten ikke får lov til å lagre: gå til **Settings → Actions → General → Workflow permissions**, velg **Read and write permissions** og kjør på nytt.
- Hvis roboten har stått stille i lang tid, kan GitHub ha slått den av. Trykk i så fall **Enable workflow** i Actions-fanen.

**Godt å vite:** Gratisplanen har forsinkede resultater, så et sluttresultat kan komme noen timer etter at kampen er ferdig. Den har ikke live-score, og 2. Bundesliga og DFB-Pokal er ikke med. Faller Schalke ut av Bundesliga, må ligakoden endres. Si fra, så hjelper jeg deg.

---

## 4. Dette trenger du

- **En Google-konto for fanklubben.** Regnearket eies av kontoen som lager det. Bruker du en felles konto (for eksempel `schalke04fansnorge@gmail.com`), forsvinner ikke medlemslisten om en person slutter i styret.
- **En ekte e-postadresse for fanklubben.** Adressen `medlem@schalke04fans.no` på siden er et eksempel som jeg har funnet på. Domenet er trolig ikke ditt, så bytt den i `js/config.js` før noen faktisk bruker den. Den felles Google-kontoen kan også brukes som kontaktadresse.
- **Betalingsinformasjon.** Skjemaet sender ikke noe automatisk svar til nye medlemmer. Den som følger opp medlemmene, svarer på e-post med kontonummer eller Vipps-nummer for kontingenten på 200 kr.

**Personvern:** Medlemslisten inneholder personopplysninger. Del regnearket bare med de i styret som trenger det (**Del**-knappen i regnearket). Ikke gjør det til «alle med lenken». Slett opplysninger hvis noen ber om det.
