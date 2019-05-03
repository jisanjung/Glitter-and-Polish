//menu toggle
var hamburger = document.getElementById("menu");
var toggleNav = document.getElementById("toggle-nav");
var x = document.getElementById("x");
var blur = document.getElementsByClassName("blur");

function showMenu() {
    toggleNav.style.transform = "translateX(-100%)";
}
function hideMenu() {
    toggleNav.style.transform = "translateX(100%)";
}
hamburger.addEventListener("click", showMenu);
x.addEventListener("click", hideMenu);