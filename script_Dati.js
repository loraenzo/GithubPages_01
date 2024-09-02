


// INSERISCI QUI I LINK




// Inserisci url del file UnMinuto
const url = `https://docs.google.com/spreadsheets/d/12yzd8zvhqWtW-4MbFMiN3hbTOXJ9sYh4/gviz/tq?tqx=responseHandler:myCallback`;



//ricorda che i link sopra non sono semplicemente copiati dal file google drive, ma sono modificati: la parte finale andrà modificata e sostituita da /gviz/tq... eccetera
//Questo URL include il percorso /gviz/tq?tqx=responseHandler:myCallback, che indica che i dati dovrebbero essere restituiti in un formato JSON e gestiti
//dalla funzione myCallback




//  ----        RICORDA DI AGGIORNARE ANCHE I LINK DELLA CARTELLA ARCHIVIO      -----


//  ----        SE CAMBI GLI URL DELLE PèAGINE, SOSTITUISCILI ANCHE NEGLI IF CHE RACCHIUDONO I DUE PEZZI DI CODICE SOTTO      -----




// VALORI TEMPO REALE



document.addEventListener("DOMContentLoaded", function() {      
    getLastNRowsFromGoogleSheetForDati();
    setInterval(getLastNRowsFromGoogleSheetForDati, 5000); // repeat every 1 seconds
  });

  function getLastNRowsFromGoogleSheetForDati() {
    

    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);

    window.myCallback = function(data) {
        const rows = data.table.rows;
        //console.log("Numero totale di righe: ", rows.length); // Log del numero totale di righe
    
        //for (let i = 0; i < rows.length; i++) {
        //   console.log(`Riga ${i}: `, rows[i].c[1]?.v); // Log per ogni riga
        //}
    
        const lastRow = rows[rows.length - 1];
        const lastValue = lastRow.c[1].v;
        document.getElementById('min1').innerHTML = lastValue.toFixed(1);
    
        // Media delle ultime 10 righe
        if (rows.length >= 10) { // Modificato il controllo, prima era if row.length - 5
            //console.log("Calcolo la media delle ultime 10 righe."); // Log di debug
            var sum10 = 0;
            for (var i = rows.length - 10; i < rows.length; i++) {
                valore = rows[i].c[1].v;
                sum10 += 10**(0.1 * valore);
                //console.log(`Riga ${i}: Valore ${valore}`); // Log del valore per ogni riga
            }
            avg10 = 10 * (Math.log10(sum10 / 10));
            document.getElementById('min10').innerHTML = avg10.toFixed(1);
        } else {
            console.log("Non ci sono abbastanza righe per calcolare la media delle ultime 10 righe."); // Log di debug
            document.getElementById('min10').innerHTML = "ND";
        }
    
        // Media delle ultime 30 righe
        if (rows.length >= 30) { // Modificato il controllo, prima era if row.length - 5
            //console.log("Calcolo la media delle ultime 30 righe."); // Log di debug
            var sum30 = 0;
            for (var i = rows.length - 30; i < rows.length; i++) {
                valore = rows[i].c[1].v;
                sum30 += 10**(0.1 * valore);
                //console.log(`Riga ${i}: Valore ${valore}`); // Log del valore per ogni riga
            }
            avg30 = 10 * (Math.log10(sum30 / 30));
            document.getElementById('min30').innerHTML = avg30.toFixed(1);
        } else {
            console.log("Non ci sono abbastanza righe per calcolare la media delle ultime 30 righe."); // Log di debug
            document.getElementById('min30').innerHTML = "ND";
        }
    };
    
    
  }



