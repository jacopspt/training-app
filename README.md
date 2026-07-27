# JacopsPT — Over 40 Fitness

Suite completa per personal trainer: schede di allenamento, diario, analisi volume, piano alimentare, gestione clienti e scheda atleta.

## L'app: `JacopsPT.html`

Un unico file autonomo: **si apre con doppio click nel browser** (Chrome, Edge, Safari, Firefox), senza installazioni né server. Include:

- **⚡ Costruttore Split** — composizione rapida della suddivisione settimanale
- **Schede** — programmazione per settimana (4–12), serie con tipo (Fisso, Range, Max Rep, EMOM, Tempo, Test), TUT, recuperi, RPE, % 1RM, supersets, link YouTube per esercizio
- **Diario** — registrazione di kg/ripetizioni/RPE effettivi con confronto sul pianificato
- **Volume** — grafici volume/intensità/densità per settimana e gruppo muscolare
- **🍎 Alimentazione** — fabbisogno energetico (BMR/TDEE), macro target e piano settimanale generato con AI (dentro claude.ai) o via prompt da copiare
- **🗂 Clienti / 👤 Atleta** — anagrafica, quadro clinico, plicometria, circonferenze, test massimali, somatotipo, check fotografici, stampa del diario brandizzato
- **Salvataggio automatico** in localStorage con backup di sicurezza, più **Export/Import** del backup completo su file

I dati vivono nel browser in cui si usa l'app: fare Export del backup periodicamente.

## Struttura del repository

- `JacopsPT.html` — l'app completa pronta all'uso (bundle autonomo)
- `app-src/app.dc.js` — il sorgente dell'app estratto dal bundle, per revisione e modifiche future
- `legacy/` — la prima bozza (progetto Vite/React), superata ma conservata per riferimento
