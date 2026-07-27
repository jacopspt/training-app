# Training App — JacopsPT

App per creare e gestire schede di allenamento con programmazione settimanale, diario e analisi del volume.

## Funzionalità

- **Schede**: crea più schede (A, B, C…), ogni esercizio con serie per settimana (4–12 settimane). Carico fisso, rep range o EMOM; carico in kg o in % del 1RM (calcolato anche in automatico dai log con formula di Epley). Supersets, note, duplica/riordina esercizi.
- **Diario**: per ogni settimana inserisci kg, ripetizioni e RPE effettivi, con confronto (Δ) rispetto al pianificato.
- **Volume**: grafici volume/intensità/densità per settimana, globali e per gruppo muscolare.
- **Progressioni**: salva schemi di progressione riutilizzabili e applicali a qualsiasi esercizio.
- **Stampa**: anteprima scheda o diario con stampa diretta / salvataggio PDF dal browser.
- **Salvataggio**: automatico in localStorage, più esporta/importa backup JSON (pannello 📁 Schede).

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://localhost:5173
npm run build    # build di produzione in dist/
npm run preview  # anteprima della build
```
