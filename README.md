# Progetto Test Backend Developer NodeJS

Progetto per Backend developer realizzato secondo la [specifica](#specifica) indicata sotto.

### Requisiti tecnici

Affinché il progetto possa essere avviato correttamente, è necessario che sulla macchina del candidato siano installati:

- [Docker](https://www.docker.com/)

Ai fini di sviluppo, si consiglia di installare anche:

- [NodeJS](https://nodejs.org/en/)


### Specifica

Dopo aver clonato questo repository, lo si estenda con il fine di realizzare una piccola applicazione in Node.js facendo uso del framework Express (già installato). L'applicazione da sviluppare consiste di un webserver (in ascolto all'URL http://localhost:8080) che deve esporre un'API con le seguenti rotte:

-
    <table>
    <thead>
    <tr>
    <th>Path</th>
    <th>Metodo</th>
    <th>Esempio di body di risposta</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>
  
    ```/```
  
    </td>
    <td>GET</td>
    <td>
    
    ```HTML
    <!DOCTYPE html>
    <html>
        <head></head>
        <body>Hello World!</body>
    </html>
    ```
    
    </td>
    </tr>
    </tbody>
    </table>
    
    Risponde con una pagina HTML contenente il messaggio "Hello World!"

-
    <table>
    <thead>
    <tr>
    <th>Path</th>
    <th>Metodo</th>
    <th>Esempio di body in richiesta</th>
    <th>Esempio di body in risposta</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>
  
    ```/books```
  
    </td>
    <td>POST</td>
    <td>
  
    ```json
    {
      "name": "Treasure Island",
      "author": "Robert Louis Stevensonr",
      "publisher": "Cassell and Company",
      "edition": 1,
      "pages": 292,
      "releaseDate": "1983-11-14"
    }
    ```
  
    </td>
  <td>

    ```json
    {
      "id": "a9f694c5-2099-404c"
    }
    ```

    </td>
    </tr>
    </tbody>
    </table>

    Inserisce all'interno della collection ```books``` di MongoDB un nuovo document con i dati presenti nel body della chiamata. Se l'oggetto passato nel body non rispetta il modello ([vedi sotto](#database)) la rotta deve rispondere con un opportuno codice di errore. La rotta deve rispondere con un oggetto JSON contenente l'id del documento appena aggiunto.

-
    <table>
    <thead>
    <tr>
    <th>Path</th>
    <th>Metodo</th>
    <th>Esempio di body in risposta</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>
  
    ```/books/[id]```
  
    </td>
    <td>GET</td>
    <td>
    
    ```json
    {
      "name": "Treasure Island",
      "author": "Robert Louis Stevensonr",
      "publisher": "Cassell and Company",
      "edition": 1,
      "pages": 292,
      "releaseDate": "1983-11-14"
    }
    ```
    
    </td>
    </tr>
    </tbody>
    </table>

  Preleva dalla collection ```books``` di MongoDB il documento con ```_id``` uguale al parametro ```[id]``` specificato nel path e lo restituisce in formato JSON. Se tale documento non è presente nella collection la rotta risponde con un opportuno codice di errore.

-
    <table>
    <thead>
    <tr>
    <th>Path</th>
    <th>Metodo</th>
    <th>Esempio di body in risposta</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>
  
    ```/songs```
  
    </td>
    <td>GET</td>
    <td>
    
    ```
    [
      {
        "genre": "Jazz",
        "songs": [
            ...
        ]
      },
      {
        "genre": "Pop",
        "songs": [
            ...
        ]
      },
      ...
    ]
    ```
    
    </td>
    </tr>
    </tbody>
    </table>

  Recupera una lista di pezzi musicali chiamando il servizio esterno Songs ([vedi sotto](#songs)), ne aggrega i dati ottenuti e restituisce la lista JSON di **tutti** i generi musicali, ciascuno contenente l'array dei pezzi musicali che ne fanno parte.

### Database

Un'istanza locale di [MongoDB 5](https://www.mongodb.com/docs/v5.0/tutorial/getting-started/) è automaticamente avviata dal comando ```npm start``` ed è raggiungibile sulla porta di default dell'host virtuale ```database```.

Il database usato dall'applicazione **deve** chiamarsi ```test-nodejs```, come specificato nel file ```.env```.

La collection ```books``` deve contenere documenti che soddisfano il seguente schema:

```
{
  "name": string,
  "author": string,
  "publisher": string,
  "edition": number,
  "pages": number,
  "releaseDate": string // (data in formato YYYY-MM-DD)
}
```

La chiave della collection ```books``` è costituita dai campi ```name```, ```author```, ```publisher```, ```edition``` e non devono di conseguenza esistere due documenti nella collection che presentano identici i valori di tutti questi campi. L'_id di un nuovo document può essere autogenerato da MongoDB.

### Servizi esterni

I servizi esterni rappresentano una simulazione in locale di API di terze parti a cui il candidato deve appoggiarsi per implementare l'applicazione da consegnare.

#### Songs

Il servizio esterno Songs viene avviato automaticamente dal comando ```npm start``` ed è in ascolto all'URL http://localhost:9009. Tale servizio esterno è un'API che espone le rotte:

-
    <table>
    <thead>
    <tr>
    <th>Path</th>
    <th>Metodo</th>
    <th>Esempio di body in risposta</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>
  
    ```/count```
  
    </td>
    <td>GET</td>
    <td>
    
    ```json
    {
      "count": 1800
    }
    ```
    
    </td>
    </tr>
    </tbody>
    </table>

    Restituisce il numero totale di pezzi musicali.

-
  <table>
  <thead>
  <tr>
  <th>Path</th>
  <th>Metodo</th>
  <th>Esempio di body in risposta</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>
  
  ```/```
  
  </td>
  <td>GET</td>
  <td>

  ```
  [
    {
      "id": "e941a0a2-818f",
      "name": "La vie en rose",
      "author": "Édith Piaf",
      "genre": "Chanson",
      "description":  "..."
    },
    ...
  ]
  ```

  </td>
  </tr>
  </tbody>
  </table>

  Restituisce una lista JSON di pezzi musicali. Questa rotta **è paginata** e richiede pertanto due parametri nel query string:

  <table>
  <thead>
  <tr>
  <th>Chiave</th>
  <th>Valore</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>

  ```offset```

  </td>
  <td>Rappresenta il numero di risultati
  da skippare (o, detta in altri termini, il primo risultato da restituire)</td>
  </tr>
  <tr>
  <td>

  ```limit```

  </td>
  <td>Rappresenta il numero massimo di risultati da restituire (valore massimo 500)</td>
  </tr>
  </tbody>
  </table>

I pezzi musicali restituiti dal servizio esterno rispettano tutti il seguente schema:
```
{
    "id": string,
    "name": string,
    "author": string,
    "genre": string,
    "description": string,
}
```

> **Nota:**
> Questo servizio esterno è autenticato e necessita di un token da inserire nell' header HTTP 'TOKEN-V1' di tutte le chiamate. Il token può essere recuperato richiamando il servizio esterno Auth (vedi sotto)

#### Auth

Il servizio esterno Auth viene avviato automaticamente dal comando ```npm start``` ed è in ascolto all'URL http://localhost:9010. Tale servizio esterno è un'API che espone la rotta:

<table>
<thead>
<tr>
<th>Path</th>
<th>Metodo</th>
<th>Azione</th>
<th>Esempio di body in risposta</th>
</tr>
</thead>
<tbody>
<tr>
<td>

```/access-token```

</td>
<td>GET</td>
<td>

Restituisce un token per l'autenticazione del servizio esterno [Songs](#songs). Il token **è valido per un'ora** in seguito alla sua creazione.

</td>
<td>

```json
{
  "TOKEN-V1": "02a43f29ac6f4d"
}
```

</td>
</tr>
</tbody>
</table>

### Tutti i comandi

- ```npm start``` (o ```npm run start```) avvia tutti i processi dell'applicazione in dei container Docker:
  - Un'istanza di [MongoDB 5](https://www.mongodb.com/docs/v5.0/tutorial/getting-started/) in ascolto su ```localhost``` alla sua porta di default. 
  - L'API sviluppata con ```index.js``` come entry point ed in ascolto all'URL http://localhost:8080. Per favorire lo sviluppo, questo processo è avviato tramite [nodemon](https://nodemon.io/), configurato per riavviare automaticamente il processo in seguito a qualsiasi modifica dei suoi sorgenti (```index.js``` e tutti i moduli da esso eventualmente importati).
  - Il servizio esterno [Songs](#songs), in ascolto all'URL http://localhost:9009.
  - Il servizio esterno [Auth](#auth), in ascolto all'URL http://localhost:9010.
  - **Nota**: richiede ```npm install```.






