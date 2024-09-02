


// INSERISCI QUI I LINK




// Inserisci url del file DieciMinuti
const urlGrafico = `https://docs.google.com/spreadsheets/d/134eBRtcrxu3ZCSnbGWcJBWxwWCkAWLwc/gviz/tq?tqx=responseHandler:myCallback`;


//ricorda che i link sopra non sono semplicemente copiati dal file google drive, ma sono modificati: la parte finale andrà modificata e sostituita da /gviz/tq... eccetera
//Questo URL include il percorso /gviz/tq?tqx=responseHandler:myCallback, che indica che i dati dovrebbero essere restituiti in un formato JSON e gestiti
//dalla funzione myCallback




//  ----        RICORDA DI AGGIORNARE ANCHE I LINK DELLA CARTELLA ARCHIVIO      -----


//  ----        SE CAMBI GLI URL DELLE PèAGINE, SOSTITUISCILI ANCHE NEGLI IF CHE RACCHIUDONO I DUE PEZZI DI CODICE SOTTO      -----





// GRAFICO




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
