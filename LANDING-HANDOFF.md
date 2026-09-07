# Landing “Cambia direzione”

## Stato

Versione locale di prova, non pubblicata su GitHub o Vercel.

- Landing: `/cambia-direzione/`
- Workbook online: `/workbook-stato-attuale/`
- Ringraziamento: `/grazie-per-il-workbook/`
- Il video è provvisorio e chiaramente etichettato; il vecchio PDF statico non è più usato.
- Il workbook funziona in modalità dimostrativa su `localhost` e `127.0.0.1`.
- Nella demo la bozza resta soltanto nel browser e al termine non vengono inviati o salvati dati personali.
- Sul dominio pubblico il workbook usa una funzione server: senza Supabase, Resend e mittente verificato non simula un successo.
- In produzione la funzione prepara un PDF personale dalle risposte e lo invia al partecipante e a Gabriele.

## Anteprima locale

Con Vite attivo sulla porta 4173:

`http://127.0.0.1:4173/cambia-direzione/`

Per testare il percorso aprire prima la landing, scegliere “Inizia il workbook online” e usare un nome dimostrativo, `test@example.com` e la presa visione della Privacy Policy.

## Sostituire il video

Il contenuto e i percorsi principali sono definiti in `src/LandingPage.jsx`.

### Video

- File web: `public/media/video-metodo-ria-prova.mp4`
- Sottotitoli: `public/media/video-metodo-ria-prova.it.vtt`
- Poster attuale: `public/media/method-gabriele-cinematic.webp`
- Velocità temporanea: `0.88`, nell’evento `onLoadedMetadata`.
- Il file originale rimane intatto nella cartella “Video TikTok sottotitoli piccoli”.

Per il video definitivo sostituire il file, aggiornare sottotitoli e poster, togliere l’etichetta “Video di prova” e impostare velocità 1 se il video è già montato correttamente.

## Attivare il workbook reale

1. Accedere al progetto Supabase autorizzato da Gabriele.
2. Applicare lo schema della tabella `workbook_responses` contenuto in `supabase/schema.sql`.
3. Collegare Resend, verificare un dominio mittente e creare la chiave API.
4. Configurare su Vercel `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `WORKBOOK_FROM_EMAIL` e `WORKBOOK_OWNER_EMAIL`.
5. Questi valori sono solo lato server: non usare mai il prefisso `VITE_` e non inserirli nel repository.
6. Effettuare un invio controllato con dati di prova, verificare la riga nel database e l’arrivo di entrambe le e-mail con PDF allegato.
7. Pubblicare soltanto dopo l’approvazione esplicita di Gabriele.

## URL social

Instagram:

`https://gabrieleciandrini.com/cambia-direzione/?utm_source=instagram&utm_medium=social&utm_campaign=workbook_direzione`

TikTok:

`https://gabrieleciandrini.com/cambia-direzione/?utm_source=tiktok&utm_medium=social&utm_campaign=workbook_direzione`

Facebook:

`https://gabrieleciandrini.com/cambia-direzione/?utm_source=facebook&utm_medium=social&utm_campaign=workbook_direzione`

Questi URL sono preparati per la pubblicazione, ma non vanno usati nelle bio o nelle campagne prima del deployment approvato.

## Privacy e SEO

- Nessuna iscrizione automatica alla newsletter.
- Il workbook e il ringraziamento sono `noindex, follow` e fuori sitemap; la landing resta indicizzabile in produzione.
- Le bozze restano nel `localStorage` del dispositivo finché non vengono inviate o cancellate.
- Nessun Meta Pixel, Google Analytics o cookie pubblicitario aggiunto.
- Video ospitato localmente, senza embed esterni.
- Privacy Policy aggiornata per la richiesta delle risorse e i dati di provenienza.
- Landing in sitemap e indicizzabile in produzione.
- Anteprime con `noindex`.
- Le risposte inviate vengono conservate in Supabase, il PDF viene generato nella funzione e trasmesso tramite Resend.

## Verifiche eseguite

- Build di anteprima e di produzione.
- SEO su 43 route pubbliche.
- Audit approfondito su 45 pagine, inclusi workbook e ringraziamento: 0 errori e 0 avvisi nell’ultima build di produzione.
- Nessun errore React dopo la correzione dell’attributo di priorità immagine.
- Video disponibile con velocità 0,88.
- Validazione dei campi vuoti e dell’e-mail non valida.
- Percorso locale completo, validazione delle risposte necessarie e navigazione alla pagina “Grazie”.
- Funzione server provata senza rete: inserimento database, due e-mail, aggiornamento consegna e PDF allegato.
- Collegamento WhatsApp con messaggio precompilato.
- Viewport reali 375, 390, 430, 768 e 1440 px: nessun overflow orizzontale.
- PDF personale di esempio di 7 pagine renderizzato e controllato visivamente.
- Video ottimizzato e verificato con decodifica completa.

Lighthouse non è stato eseguito: non viene dichiarato un punteggio non misurato.

## File modificati o aggiunti

### Applicazione e configurazione

- `src/LandingPage.jsx`
- `src/landing.css`
- `src/main.jsx`
- `supabase/schema.sql`
- `scripts/prerender.mjs`
- `scripts/verify-seo.mjs`
- `scripts/audit-seo-deep.mjs`
- `LANDING-HANDOFF.md`
- `.gitignore` (esclude materiali temporanei e master locali dal deployment)

### Materiali pubblici

- `public/media/video-metodo-ria-prova.mp4`
- `public/media/video-metodo-ria-prova.it.vtt`
- `src/OnlineWorkbook.jsx`
- `src/workbook.css`
- `src/workbookQuestions.js`
- `api/workbook-submit.js`
- `api/lib/workbook-pdf.js`

### Materiali di prova e verifica

- `output/pdf/workbook-online-esempio.pdf`
- `tmp/pdfs/workbook-online-example-rendered/page-1.png` fino a `page-7.png`
- `scripts/test-workbook-backend.mjs`
- `tmp/capture-responsive.mjs`
- `tmp/screenshots/landing-mobile-390.png`
- `tmp/screenshots/landing-mobile-390-full.png`
- `tmp/screenshots/landing-desktop-1440.png`
- `tmp/screenshots/landing-desktop-1440-full.png`

I materiali in `tmp` sono strumenti e prove locali, non contenuti destinati al deployment.
