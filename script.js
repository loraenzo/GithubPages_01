


// INSERISCI QUI I LINK




// Inserisci url del file UnMinuto
const url = `https://docs.google.com/spreadsheets/d/12yzd8zvhqWtW-4MbFMiN3hbTOXJ9sYh4/gviz/tq?tqx=responseHandler:myCallback`;

// Inserisci url del file DieciMinuti
const urlGrafico = `https://docs.google.com/spreadsheets/d/134eBRtcrxu3ZCSnbGWcJBWxwWCkAWLwc/gviz/tq?tqx=responseHandler:myCallback`;


//ricorda che i link sopra non sono semplicemente copiati dal file google drive, ma sono modificati: la parte finale andrà modificata e sostituita da /gviz/tq... eccetera
//Questo URL include il percorso /gviz/tq?tqx=responseHandler:myCallback, che indica che i dati dovrebbero essere restituiti in un formato JSON e gestiti
//dalla funzione myCallback




//  ----        RICORDA DI AGGIORNARE ANCHE I LINK DELLA CARTELLA ARCHIVIO      -----


//  ----        SE CAMBI GLI URL DELLE PèAGINE, SOSTITUISCILI ANCHE NEGLI IF CHE RACCHIUDONO I DUE PEZZI DI CODICE SOTTO      -----




// VALORI TEMPO REALE


if (window.location.pathname === '/GithubPages_01/datiExcel.html') {

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
}

// GRAFICO


else if (window.location.pathname === '/GithubPages_01/grafico.html') {

let chart;

document.addEventListener("DOMContentLoaded", function() {
    // Disabilitato il refresh automatico
    getLastNRowsFromGoogleSheet();
    // setInterval(getLastNRowsFromGoogleSheet, 1000); // ripeti ogni 1 secondo
    document.getElementById('refreshButton').addEventListener('click', getLastNRowsFromGoogleSheet);
});

function getLastNRowsFromGoogleSheet() {
    //const url = `https://docs.google.com/spreadsheets/d/1-ChzNRGrvaDVfi1l1Z-wSCbsDCq4RbXu/gviz/tq?tqx=responseHandler:myCallback`;
    //const url = `https://docs.google.com/spreadsheets/d/11KMOCfSLIDf6RsGyYeFp-Y1UVMTXgW6m/gviz/tq?tqx=responseHandler:myCallback`;
    const script = document.createElement('script');
    script.src = urlGrafico;
    document.body.appendChild(script);

    window.myCallback = function(data) {
        const rows = data.table.rows;
        const numRows = parseInt(document.getElementById('numRows').value, 10);
        const labels = [];
        const values = [];

        // Prepara i dati per il grafico
        for (let i = Math.max(rows.length - numRows, 0); i < rows.length; i++) {
            const value = rows[i].c[1].v;
            
            
        // Converti la data/ora nel formato aaaa-mm-gg, hh:mm
        const rawDate = rows[i].c[0].v;
        const formattedDate = parseDate(rawDate);
        labels.push(formattedDate);
        values.push(parseFloat(value));
        }

        

        // Aggiorna il grafico
        updateChart(labels, values);
    };
}

function parseDate(rawDate) {
    // Estrai i valori dalla stringa Date(aaaa,m,gg,hh,mm,ss)
    const match = rawDate.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2}),(\d{1,2}),(\d{1,2}),(\d{1,2})\)$/);
    if (match) {
        const [, year, month, day, hours, minutes] = match.map(Number);

        // Crea una stringa con il formato aaaa-mm-gg, hh:mm
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    }
    // Se la stringa non è valida, ritorna un valore che rappresenta una data invalida
    return new Date(NaN);
}

function updateChart(labels, values) {
    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valori',
                data: values,
                borderColor: 'rgba(0, 0, 0, 0.5)',
                //backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Questa opzione nasconde la legenda
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tempo'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valori [dB(A)]'
                    }
                }
            }
        }
    });
}

}