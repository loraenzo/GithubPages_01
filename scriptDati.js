document.addEventListener("DOMContentLoaded", function() {      
    getLastNRowsFromGoogleSheet();
    setInterval(getLastNRowsFromGoogleSheet, 30000); // repeat every 30 seconds
  });

  function getLastNRowsFromGoogleSheet() {
    //const url = `https://docs.google.com/spreadsheets/d/1-4rdXZ7kTRsVGQJ2H4JChhEl4PlmJE42/gviz/tq?tqx=responseHandler:myCallback`;
    //questo link sopra è inutile, perché fa la media degli ultimi 1, 10 o 30 valori per mostrare i dati. Peccato che sia il file dove vengono già salvati i LAeq ogni 10 min
    //o meglio, andrebbe bene se volessi mostrare solo il LAeq ogni 10 o 30 minutoi, ma dovrei ricordarmi di modificare la parte sotto per non prendere gli ultimi 10 e 30 valori rispettivamente ma solo 1 o 3
  
    //const url = `https://docs.google.com/spreadsheets/d/1-ChzNRGrvaDVfi1l1Z-wSCbsDCq4RbXu/gviz/tq?tqx=responseHandler:myCallback`
    const url = `https://docs.google.com/spreadsheets/d/11KMOCfSLIDf6RsGyYeFp-Y1UVMTXgW6m/gviz/tq?tqx=responseHandler:myCallback`;

    //ricorda che il link non è semplicemente copiato dal file google drive, ma è modificato: la parte finale andrà modificata e sostituita da /gviz/tq... eccetera
    //Questo URL include il percorso /gviz/tq?tqx=responseHandler:myCallback, che indica che i dati dovrebbero essere restituiti in un formato JSON e gestiti dalla funzione myCallback

    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);

    window.myCallback = function(data) {        
      const rows = data.table.rows;
      const lastRow = rows[rows.length - 1];
      const lastValue = lastRow.c[1].v; //accede al valore contenuto nella seconda cella (c[1]); v indica che ne prendiamo il valore
      
      //scrivi l'ultimo valore, cioè il LAeq dell'ultimo minuto
      document.getElementById('min1').innerHTML=lastValue.toFixed(1);

      //fai la media delle ultime 10 righe
      if (rows.length -5>=10){
        var sum10 = 0;
        for (var i = rows.length - 10; i < rows.length; i++) {
          valore=rows[i].c[1].v;
          sum10 += 10**(0.1*valore);
        }
        avg10= 10*(Math.log10(sum10/10))
        document.getElementById('min10').innerHTML=avg10.toFixed(1);
      }
      else{
        document.getElementById('min10').innerHTML="ND";
      }

      //fai la media delle ultime 30 righe
      if (rows.length -5>=30){
        var sum30 = 0;
        for (var i = rows.length - 30; i < rows.length; i++) {
          valore=rows[i].c[1].v;
          sum30 += 10**(0.1*valore);
        }
        avg30= 10*(Math.log10(sum30/30))
        document.getElementById('min30').innerHTML=avg30.toFixed(1);
      }
      else{
        document.getElementById('min30').innerHTML="ND";
      }

      
    };
  }