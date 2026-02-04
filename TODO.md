# TODO - QuizApp (Google Sheets + Apps Script)

Data: 2026-02-04

Obiettivo: Single Page App che mostra domande dal Google Sheet filtrabili per materia/argomento e visualizza feedback docente.

Attività principali

1. Creare Google Sheet `Questions`
   - Intestazione: ID | Subject | Topic | Question | Feedback
   - Popolare alcune righe di esempio per i test
   - Stato: not-started

2. Creare progetto Apps Script
   - File: `Code.gs` (backend) e `Index.html` (frontend)
   - Configurare `doGet` per servire la SPA
   - Stato: not-started

3. Implementare funzioni server in `Code.gs`
   - `getSubjects()`
   - `getTopics(subject)`
   - `getRandomQuestion(subject, topic)`
   - `getFeedback(row)`
   - Stato: not-started

4. Implementare front-end SPA in `Index.html`
   - Dropdown `Subject` / `Topic`
   - Bottone `Random` per prendere una domanda a caso
   - Bottone `Mostra feedback docente` per visualizzare il feedback
   - Stato: not-started

5. Distribuzione e autenticazione
   - Deploy > New deployment > Web app
   - `Execute as`: scegliere tra `User accessing the web app` o `Me`
   - `Who has access`: impostare in base agli utenti target
   - Considerare Google Identity Services per casi avanzati
   - Stato: not-started

6. Test e rifiniture
   - Popolare il foglio con più domande
   - Verificare autorizzazioni e flusso di login
   - Aggiungere gestione errori e UX miglioramenti
   - Stato: not-started

Attività opzionali

- A: Log delle sessioni utenti (salvare timestamp/email e scelta domanda)
- B: Caching lato server per performance
- C: Miglior UI/UX (design, accessibilità)

Note rapide per sviluppo locale con `clasp` (opzionale)

1. `npm install -g @google/clasp`
2. `clasp login`
3. `clasp create --title "QuizApp" --type webapp` oppure `clasp clone <scriptId>`
4. `clasp push` / `clasp pull` per sincronizzare i file

---

Vuoi che generi ora i file `Code.gs` e `Index.html` con il codice base da incollare nel progetto Apps Script?