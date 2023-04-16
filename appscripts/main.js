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

//Form Submit function
function greetingFunction() {
  var answer1 = document.getElementById("name1").value;
  var answer2 = document.getElementById("study1").value;
  window.alert("Hi there " + answer1 + ", nice to meet you! " + answer2 + " sounds really interesting! I'm glad you're pursuing that ~");
}