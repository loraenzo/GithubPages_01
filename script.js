// script.js

// URL del file Excel. Deve essere accessibile via URL.
const excelFileUrl = 'https://docs.google.com/spreadsheets/d/1-4rdXZ7kTRsVGQJ2H4JChhEl4PlmJE42/edit?gid=1999123467#gid=1999123467';

// Funzione per caricare e visualizzare i dati dal file Excel
function loadAndDisplayExcelData() {
    fetch(excelFileUrl)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            // Prendi il primo foglio di lavoro
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Converti il foglio di lavoro in un oggetto JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Mostra i dati nella tabella
            displayData(jsonData);
        })
        .catch(error => console.error('Errore nel caricamento del file Excel:', error));
}

// Funzione per visualizzare i dati nella tabella HTML
function displayData(data) {
    const table = document.getElementById('dataTable');
    table.innerHTML = ''; // Pulisci la tabella

    data.forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((cell) => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}

// Carica i dati all'avvio
loadAndDisplayExcelData();

// Aggiorna i dati ogni minuto (60000 millisecondi)
setInterval(loadAndDisplayExcelData, 60000);
