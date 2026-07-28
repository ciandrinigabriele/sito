# Sito personale — Gabriele Ciandrini

Sito React/Vite con modulo contatti collegabile a Supabase e pronto per Vercel.

## Configurazione

1. Crea un progetto Supabase.
2. Esegui `supabase/schema.sql` nell'editor SQL.
3. Copia `.env.example` in `.env.local` e inserisci URL e chiave pubblica anon.
4. Su Vercel aggiungi le stesse variabili:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Avvio locale

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

La build genera HTML statico, metadati, dati strutturati, `sitemap.xml`,
`robots.txt` e controlla automaticamente tutte le URL importate da WordPress.
Le build Vercel di anteprima sono `noindex`; la produzione è indicizzabile.

## Pubblicazione controllata su Meta

L'endpoint server `/api/meta/publish` prepara e pubblica un articolo su Facebook
e Instagram senza esporre token nel browser.

Configurare in Vercel, soltanto come variabili server:

- `META_GRAPH_API_VERSION`: versione Graph API attiva nell'app Meta.
- `META_PAGE_ID`: ID della Pagina Facebook.
- `META_INSTAGRAM_BUSINESS_ACCOUNT_ID`: ID dell'account Instagram professionale collegato.
- `META_PAGE_ACCESS_TOKEN`: token Pagina di lunga durata con i permessi di pubblicazione.
- `META_PUBLISH_SECRET`: segreto casuale usato per autorizzare le richieste.

Permessi Meta normalmente necessari: `pages_manage_posts`,
`pages_read_engagement`, `instagram_basic` e `instagram_content_publish`.
L'account Instagram deve essere professionale e collegato alla Pagina Facebook.

Prima di pubblicare davvero, inviare la stessa richiesta con `"dryRun": true`.
Il server convalida dominio, immagine, testo e piattaforme, ma non chiama Meta.
