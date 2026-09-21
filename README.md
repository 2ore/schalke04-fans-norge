# Schalke 04 Fans Norge – nettside

Nettsiden til Schalke 04 Fans Norge, fanklubben i Oslo. Siden er ren HTML, CSS og JavaScript. Den trenger ingen installasjon, og du kan endre den rett på github.com.

Denne veiledningen er skrevet for deg som aldri har brukt GitHub. Ta det ett steg om gangen.

---

## Innhold

| Fil eller mappe | Hva det er |
|---|---|
| `index.html` | Forsiden med all tekst |
| `js/config.js` | **E-postadresse, kontingent, treff og sosiale medier.** Dette er filen du oftest endrer |
| `js/main.js` | Nedtelling, skjema og lysanimasjon. Du trenger ikke røre den |
| `css/style.css` | Farger, skrifter og utseende |
| `img/` | Logo og ikoner |
| `favicon.ico` | Lite ikon i nettleserfanen |
| `robots.txt`, `_headers`, `.nojekyll` | Tekniske filer. Ikke rør |

---

## Slik får du siden på nett (GitHub Pages)

GitHub kan vise siden for deg helt gratis. Du trenger bare én konto. Du trenger ikke Cloudflare for å komme i gang.

### 1. Lag konto og «repository»

Et repository er en mappe på GitHub der prosjektet ligger.

1. Gå til [github.com](https://github.com) og trykk **Sign up**. Bekreft e-postadressen din.
2. Trykk **+** øverst til høyre og velg **New repository**.
3. Skriv `schalke04-fans-norge` i **Repository name**. Bruk ikke mellomrom eller æøå.
4. Velg **Public**. Gratis GitHub Pages krever det. Ingenting hemmelig ligger i filene.
5. La alle avkrysningsboksene under stå tomme og trykk **Create repository**.

### 2. Last opp filene

1. Pakk ut ZIP-filen på maskinen din.
2. Trykk **uploading an existing file** på den tomme repository-siden.
3. Åpne den utpakkede mappen og marker alt innholdet (Ctrl+A, eller Cmd+A på Mac). Dra det inn i nettleservinduet. Ikke dra selve mappen. `index.html` må ligge øverst i repositoryet.
4. Vent til alt er lastet opp. Du skal se `index.html`, `css`, `js` og `img` i listen.
5. Skriv «Første versjon» i feltet nederst og trykk **Commit changes**.

### 3. Slå på GitHub Pages

1. Gå til **Settings** (fanen øverst i repositoryet) og velg **Pages** i menyen til venstre.
2. Velg **Deploy from a branch** under **Source**.
3. Velg **main** under **Branch**, og `/ (root)` som mappe. Trykk **Save**.
4. Vent 1–2 minutter og last siden på nytt. Adressen vises øverst:
   `https://DITT-BRUKERNAVN.github.io/schalke04-fans-norge/`

Siden er nå på nett.

---

## Slik endrer du siden

1. Gå til repositoryet ditt på github.com.
2. Klikk på filen du vil endre, for eksempel `js/config.js`.
3. Trykk **blyantikonet** (Edit this file) øverst til høyre i filen.
4. Endre teksten.
5. Trykk **Commit changes…** og deretter den grønne **Commit changes**-knappen.
6. Siden oppdateres etter cirka ett minutt. Trykk Ctrl+F5 (Cmd+Shift+R på Mac) for å se den nye versjonen.

**Gjorde du en feil?** Åpne filen og trykk **History**. Der ligger alle tidligere versjoner. Åpne den gamle versjonen, kopier innholdet og lim det inn i filen igjen.

### Hva du endrer hvor

| Du vil endre | Fil | Søk etter |
|---|---|---|
| Neste treff, nye treff, fjerne treff | `js/config.js` | `EVENTS` |
| E-postadresse | `js/config.js` | `email` |
| Kontingent | `js/config.js` | `price` |
| Facebook og Instagram | `js/config.js` | `links` |
| Stor overskrift på forsiden | `index.html` | `Glück auf` |
| Teksten under overskriften | `index.html` | `Fanklubben for` |
| De tre stegene under «Bli medlem» | `index.html` | `Send inn skjemaet` |
| Tekst under «Om oss» | `index.html` | `Blått og hvitt` |
| Ordlisten «Ny i Schalke-verdenen?» | `index.html` | `Knappen` |
| Spørsmål og svar | `index.html` | `Må jeg bo i Oslo` |
| Farger | `css/style.css` | `:root` (øverst) |

Trykk Ctrl+F i redigeringsvinduet for å søke.

### Slik legger du til et treff

Åpne `js/config.js`, kopier én hel linje i `EVENTS` (fra `{` til `},`) og lim den inn under. Endre innholdet.

```
{ date: "2026-12-05T18:00:00+01:00", hours: 3, title: "Julebord", place: "Oslo", desc: "Kort beskrivelse." },
```

- Datoformatet er `år-måned-dagTtime:minutt:00`.
- Bruk `+02:00` om sommeren (sist i mars til sist i oktober) og `+01:00` om vinteren.
- `hours` er hvor mange timer treffet varer. Det brukes i «Legg i kalenderen».
- Treff som er passert forsvinner av seg selv.

### Slik legger du til et spørsmål

Kopier en hel blokk som starter med `<details>` og slutter med `</details>` i `index.html`. Lim den inn under en annen og bytt teksten.

### Regler for å ikke ødelegge noe

- Endre bare selve teksten. Ikke slett tegn som `< > { } ( ) " , ;`.
- I `index.html` står tekst mellom `>` og `<`, for eksempel `<p>Dette kan du endre.</p>`.
- I `config.js` står tekst mellom anførselstegn. Ikke fjern dem. Bruk «norske» tegn hvis du trenger anførselstegn inni en tekst.
- Har du ødelagt noe, bruker du **History** som beskrevet over.

### Bytte logo eller bilder

- Logoen ligger i `img/`. Det trengs flere størrelser og ikoner, så be om hjelp til å lage nye logofiler.
- Andre bilder laster du opp slik: gå inn i riktig mappe på GitHub, trykk **Add file → Upload files** og dra filen inn. Hold bildene under cirka 500 kB, ellers blir siden treg.

### La flere hjelpe til

Gå til **Settings → Collaborators → Add people** og skriv inn GitHub-brukernavnet eller e-postadressen til den du vil gi tilgang.

---

## Eget domene (valgfritt)

Adressen `brukernavn.github.io/schalke04-fans-norge/` fungerer fint, men et eget domene ser bedre ut.

1. Kjøp domenet hos en registrar. For `.no` bruker du en norsk registrar, for eksempel Domeneshop. Foreninger og privatpersoner har ulike krav for `.no`, så les vilkårene hos registraren.
2. Gå til **Settings → Pages → Custom domain** på GitHub og skriv inn domenet.
3. Følg GitHubs instruksjoner for DNS-innstillingene hos registraren. Det kan ta fra noen minutter til et par timer.

---

## Alternativ: Cloudflare i stedet for GitHub Pages

Du kan la Cloudflare hente siden fra GitHub. Endringer gjør du fortsatt på github.com. Det er bare hosting som flyttes.

1. Lag en konto på [dash.cloudflare.com](https://dash.cloudflare.com).
2. Gå til **Workers & Pages → Create application → Pages → Connect to Git** og velg repositoryet.
3. La **Framework preset** stå på *None*. La **Build command** stå tom, og skriv `/` i **Build output directory**.
4. Trykk **Save and Deploy**. Du får en adresse som `navn.pages.dev`.
5. Cloudflare oppdaterer siden hver gang du lagrer en endring på GitHub.

Cloudflare endrer menyene sine av og til, så navnene kan avvike litt.

---

## Se siden på egen maskin

Pakk ut filene og dobbeltklikk på `index.html`. Skriftene lastes fra Google Fonts og vises bare når du er på nett.

---

## Godt å vite

- **Medlemsskjemaet** lagrer ingenting. Det åpner e-postprogrammet til den som melder seg inn, med en ferdig utfylt e-post til adressen i `js/config.js`. Adressen står også synlig etter at de har trykket send.
- **Personvern:** Skriftene lastes fra Google Fonts. Vil du unngå det, kan skriftene ligge i prosjektet i stedet («self-hosting»).
- **Sjekk innholdet før publisering.** E-postadresse, treff og svarene under «Spørsmål» er eksempler og må bekreftes.
- **Navn og fargen Königsblau** tilhører FC Gelsenkirchen-Schalke 04 e. V. Det står også i bunnteksten.

Glück auf!
