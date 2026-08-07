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
- **📈 Storico 1RM** (in Volume → Forza) — andamento del massimale stimato settimana per settimana, calcolato dal miglior set effettivo registrato nel Diario (formula Brzycki), con statistiche e confronto col 1RM impostato
- **🔔 Rilevatore intervalli** (in Volume) — diagnostica del mesociclo in corso ispirata alla Legge del Sette: legge carichi e RPE *effettivi* del Diario e avvisa quando il ciclo devia. **Primo intervallo (Mi-Fa)**: carico fermo mentre l'RPE sale → shock di variazione. **Secondo intervallo (Si-Do)**, prioritario: fatica alta e diffusa → deload. Altrimenti **ottava in salita**. Solo avviso: il programma non viene toccato. Tabella per esercizio con Δ carico %, Δ RPE e stato; soglie tutte in `SOGLIE`, aggregazione settimanale (top set per fatica) isolata in `aggregaSettimana`
- **🌙 Tema scuro** — selettore Chiaro/Scuro nell'header, con preferenza ricordata
- **🧠 Test** — questionari di valutazione dello stress (generale e da allenamento) con sintesi incrociata, collegati all'atleta
- **📤 Scheda al cliente** — vedi sotto: il cliente riceve la scheda sul telefono, segna i carichi e li rimanda con un tap
- **🌐 Niente traduzione automatica** — l'app si dichiara in italiano e vieta al browser di tradurla: senza questo Chrome riscriveva le voci dei menu (*Range* → «Allineare», *Max Rep* → «Reputazione massima»). Se la traduzione viene forzata a mano, l'app se ne accorge e spiega come tornare all'originale
- **Salvataggio automatico** in localStorage con backup di sicurezza, più **Export/Import** del backup completo su file e **promemoria** se l'ultimo export risale a più di 14 giorni

I dati vivono nel browser in cui si usa l'app: fare Export del backup periodicamente.

## Identità visiva

Allineata al design system del sito JacopsPT:

| Ruolo | Valore |
|---|---|
| Navy (struttura, testate, pannelli scuri) | `#183048` — variante profonda `#0f2436` |
| Teal (azione primaria, etichette di sezione) | `#187878` |
| Oro (accento, CTA in evidenza) | `#d8a830` |
| Sfondo pagina / superfici | `#f5f7f7` / `#ffffff` |
| Bordi | `#dde3e3`, `#e5eaea` |
| Bottoni | pillola (`border-radius:999px`) |
| Card e pannelli | raggio 16–18px |

I colori dei gruppi muscolari e i verdi/rossi dei delta restano semantici e fuori dalla palette di brand.
I font (Barlow Condensed, Inter) sono incorporati come woff2: la scheda del cliente si vede identica anche senza connessione.

## Giro coach ↔ cliente

Funziona senza server e senza account: la scheda è un file, i carichi tornano come messaggio.

1. **Coach — 📤 Manda al cliente**: scarica `scheda-<nome>.html` e lo manda al cliente (WhatsApp come documento, oppure mail con **✉️ Manda per mail**).
2. **Cliente**: apre il file col browser del telefono (meglio se lo aggiunge alla schermata Home). Vede scheda e video, e nel **Diario** segna kg, ripetizioni e RPE di ogni serie — il layout diventa a schede su schermo stretto e ogni modifica si salva sul dispositivo.
3. **Cliente — 📤 Invia i miei carichi al coach**: sceglie **WhatsApp** (messaggio già pronto con un codice `JPT1…`), **Copia il codice** o **Scarica il file**.
4. **Coach — 📥 Ricevi carichi (WhatsApp)**: incolla il codice ricevuto (oppure **📥 Ricevi carichi (file)** se ti ha mandato il `.json`). I valori entrano nel Diario, con scelta se sovrascrivere o riempire solo le celle vuote, e alimentano Volume e Storico 1RM.

Note: i dati del cliente restano sul suo telefono finché non li invia; se il suo browser blocca il salvataggio locale, la pagina lo avvisa di inviare subito i carichi.

## Struttura del repository

- `JacopsPT.html` — l'app completa pronta all'uso (bundle autonomo)
- `app-src/template.html` — il sorgente dell'app (markup dichiarativo + logica) estratto dal bundle; le modifiche si applicano qui e si reiniettano nel bundle codificando il template in JSON con `</` scritto come `</`
- `legacy/` — la prima bozza (progetto Vite/React), superata ma conservata per riferimento
