// Margini
var margin = {top: 20, right: 20, bottom: 30, left: 40};

// Dimensioni dell'area di disegno
var width = 500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// Definizione delle scale per le variabili
var xScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.variabile1; })]) // Intervallo dei valori della variabile1
  .range([0, width]); // Intervallo delle coordinate orizzontali

var yScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.variabile2; })]) // Intervallo dei valori della variabile2
  .range([0, height]); // Intervallo delle coordinate verticali

var baseScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.variabile3; })]) // Intervallo dei valori della variabile3
  .range([10, 100]); // Intervallo delle dimensioni della base del triangolo

var heightScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.variabile4; })]) // Intervallo dei valori della variabile4
  .range([10, 100]); // Intervallo delle dimensioni dell'altezza del triangolo


// Disegno dei triangoli isosceli
var triangoli = svg.selectAll("polygon")
  .data(data)
  .enter()
  .append("polygon")
  .attr("points", function(d) {
    var x = xScale(d.variabile1);
    var y = yScale(d.variabile2);
    var base = baseScale(d.variabile3);
    var height = heightScale(d.variabile4);

    // Calcolo dei punti del triangolo
    var point1 = [x, y];
    var point2 = [x - base / 2, y + height];
    var point3 = [x + base / 2, y + height];

    // Restituzione dei punti come stringa di coordinate
    return point1.join(",") + " " + point2.join(",") + " " + point3.join(",");
  })
  .style("fill", function(d) {
    return d3.hsl(d.variabile5, 1, 0.5); // Utilizzo della variabile5 per la tonalità del riempimento
  })
  .style("stroke", "black")
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

// Funzione per animare i cambiamenti di dimensioni dei triangoli
function animateTriangoli(triangoli) {
  triangoli.transition()
    .duration(1000) // Durata dell'animazione in millisecondi
    .attr("points", function(d) {
      var x = xScale(d.variabile1);
      var y = yScale(d.variabile2);
      var base = baseScale(d.variabile3);
      var height = heightScale(d.variabile4);

      // Calcolo dei punti del triangolo
      var point1 = [x, y];
      var point2 = [x - base / 2, y + height];
      var point3 = [x + base / 2, y + height];

      // Restituzione dei punti come stringa di coordinate
      return point1.join(",") + " " + point2.join(",") + " " + point3.join(",");
    });
}

// Avvio dell'animazione dei triangoli
animateTriangoli(triangoli);