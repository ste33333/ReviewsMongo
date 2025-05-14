# ReviewsMongo: App Recensioni Auto Full-Stack

ReviewsMongo è un'applicazione web per visualizzare auto e gestire recensioni. Il backend è sviluppato in .NET Core con MongoDB, il frontend in Angular.

## Tecnologie Chiave

* **Backend:** .NET Core (C#), MongoDB
* **Frontend:** Angular (TypeScript)
* **Database:** MongoDB
  
L'applicazione web è progettata per permettere agli utenti di esplorare una collezione di automobili, visualizzarne i dettagli e leggere o inviare recensioni per ciascun modello.
L'applicazione presenta un'interfaccia utente intuitiva realizzata con Bootstrap per la navigazione e l'interazione, le recensioni vengono salvate automaticamente nel DB Mongo.

Le funzionalità principali includono:
* Visualizzazione di un elenco di auto con dettagli salienti.
* Pagina di dettaglio per ogni auto con specifiche complete e recensioni associate.
* Possibilità per gli utenti di inviare nuove recensioni (nome, valutazione da 1 a 5 stelle, commento).
* Ricerca di auto per modello.


## Guida Rapida all'Avvio

1.  **Clona il repository:**
    ```bash
    git clone [https://github.com/ste33333/ReviewsMongo.git](https://github.com/ste33333/ReviewsMongo.git)
    cd ReviewsMongo
    ```

2.  **Backend (`CarsMongo/`):**
    * Configura la tua stringa di connessione MongoDB in `CarsMongo/appsettings.json`.
    * Dalla cartella `CarsMongo/`:
      ```bash
      dotnet run
      ```
    * L'API sarà tipicamente su `https://localhost:7200` (controlla l'output).

3.  **Frontend (`car-reviews-app/`):**
    * Naviga in `car-reviews-app/`.
    * Installa le dipendenze:
      ```bash
      npm install
      ```
    * Assicurati che `apiBaseUrl` in `src/environments/environment.ts` punti al tuo backend.
    * Avvia il server di sviluppo Angular:
      ```bash
      ng serve
      ```
    * Apri `http://localhost:4200/` nel tuo browser.

