// Dimensioni dell'area di disegno e dei margini
var margin = {top: 10, right: 10, bottom: 10, left: 10};
var width = 1000 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

// Creazione dell'elemento SVG
var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

// Caricamento dei dati dal file JSON
d3.json("data/data.json").then(function(data) {
  
    // Definizione delle scale per le variabili
  var xScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.variabile1; })])
    .range([150, width - 150]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.variabile2; })])
    .range([150, height - 150]);

  var baseScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.variabile3; })])
    .range([10, 100]);

  var heightScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.variabile4; })])
    .range([10, 100]);

  // Disegno dei triangoli
  svg.selectAll("polygon")
    .data(data.slice(0, 10)) // Considera solo i primi 10 elementi del file JSON
    .enter()
    .append("polygon")
    .attr("points", function(d) {
      var x = xScale(d.variabile1);
      var y = yScale(d.variabile2);
      var base = baseScale(d.variabile3);
      var height = heightScale(d.variabile4);

      var point1 = [x, y];
      var point2 = [x - base / 2, y + height];
      var point3 = [x + base / 2, y + height];

      return point1.join(",") + " " + point2.join(",") + " " + point3.join(",");
    })
    .style("fill", function(d) {
      return d3.hsl(d.variabile5, 1, 0.5);
    })
    .style("stroke", "black");
    
  // Variabile per memorizzare il triangolo trasparente selezionato
  var triangoloTrasparente = null;

  // Funzione per rendere trasparente un triangolo
  function renderTrasparente(triangolo) {
    triangolo.style("opacity", 0.2);
  }

  // Funzione per ripristinare il colore originale di un triangolo
  function ripristinaColore(triangolo) {
    triangolo.style("opacity", 1);
  }

  // Funzione per scambiare i valori delle variabili tra due triangoli
  function scambiaValori(triangolo1, triangolo2) {
    var variabili1 = {
      base: triangolo1.data()[0].variabile3,
      altezza: triangolo1.data()[0].variabile4
    };

    var variabili2 = {
      base: triangolo2.data()[0].variabile3,
      altezza: triangolo2.data()[0].variabile4
    };

    triangolo1.data()[0].variabile3 = variabili2.base;
    triangolo1.data()[0].variabile4 = variabili2.altezza;

    triangolo2.data()[0].variabile3 = variabili1.base;
    triangolo2.data()[0].variabile4 = variabili1.altezza;
  }

  // Aggiunta dell'evento di click ai triangoli
  svg.selectAll("polygon")
    .on("click", function(d) {
      var triangolo = d3.select(this);

      if (!triangoloTrasparente) {
        renderTrasparente(triangolo);
        triangoloTrasparente = triangolo;
      } else {
        ripristinaColore(triangoloTrasparente);
        scambiaValori(triangolo, triangoloTrasparente);
        triangoloTrasparente = null;
      }
    });

});
