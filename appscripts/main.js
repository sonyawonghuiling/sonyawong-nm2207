// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickyBar()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyBar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

/* Population Charts
document.getElementById("button1").addEventListener("click", openChart1);
document.getElementById("button2").addEventListener("click", openChart2);
document.getElementById("button3").addEventListener("click", openChart3);
document.getElementById("button4").addEventListener("click", openChart4);
document.getElementById("button5").addEventListener("click", openChart5);

function openChart1 () {
    document.getElementById("populationChart").src="../resources/total-population-line.png";
}
function openChart2 () {
    document.getElementById("populationChart").src="../resources/resident-population-line.png";
}
function openChart3 () {
    document.getElementById("populationChart").src="../resources/citizen-population-line.png";
}
function openChart4 () {
    document.getElementById("populationChart").src="../resources/pr-population-line.png";
}
function openChart5 () {
    document.getElementById("populationChart").src="../resources/non-resident-population-line.png";
}
*/

// Interactive Map for the Singapore population
var map = L.map('popMap', {center: [1.3521, 103.8198], zoom: 11});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ternary operators to check which colour to use for different population densities
function colourPopDens(d) {
  return d > 35000 ? '#b30000' :
      d > 25000 ? '#e34a33' :
          d > 20000 ? '#fc8d59' :
              d > 10000 ? '#fdcc8a' :
                  d > 1 ? '#fef0d9' :
                      '#fff';
}

function style(feature) {
  return {
      fillColor: colourPopDens(feature.properties.Pop_dens),
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.65
  };
}

function popUp(feature, layer) {
  layer.bindPopup(`
<b>Subzone: </b> ${feature.properties.SUBZONE_N} <br>
<b>Planning Area: </b> ${feature.properties.PLN_AREA_N} <br>
<b>Population density: </b> ${(feature.properties.Pop_dens).toFixed(1)} 
`)
  layer.on('click', function () { layer.openPopup(); })
}

L.geoJSON(singaporePopulation, {
  style: style,
  onEachFeature: popUp
}).addTo(map);
