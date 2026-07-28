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
