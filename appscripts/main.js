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
console.log("hello");

// Population Charts
document.getElementById("button1").addEventListener("click", openChart1);
document.getElementById("button2").addEventListener("click", openChart2);
document.getElementById("button3").addEventListener("click", openChart3);
document.getElementById("button4").addEventListener("click", openChart4);
document.getElementById("button5").addEventListener("click", openChart5);

function openChart1 () {
    document.getElementById("populationChart").src="resources/total-population-line.png";
}
function openChart2 () {
    document.getElementById("populationChart").src="resources/resident-population-line.png";
}
function openChart3 () {
    document.getElementById("populationChart").src="resources/citizen-population-line.png";
}
function openChart4 () {
    document.getElementById("populationChart").src="resources/pr-population-line.png";
}
function openChart5 () {
    document.getElementById("populationChart").src="resources/non-resident-population-line.png";
}