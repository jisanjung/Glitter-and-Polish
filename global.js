//menu toggle
var hamburger = document.getElementById("menu");
var toggleNav = document.getElementById("toggle-nav");
var x = document.getElementById("x");
var blur = document.getElementsByClassName("blur");

function showMenu() {
    toggleNav.style.transform = "translateX(-100%)";
    
    for(var i = 0; i < blur.length; i++) {
        blur[i].style.filter = "blur(6px)";
    }
}
function hideMenu() {
    toggleNav.style.transform = "translateX(100%)";
    
    for(var i = 0; i < blur.length; i++) {
        blur[i].style.filter = "blur(0)";
    }
}
function clickOut(event) {
    if (event.target != toggleNav && event.target.parentNode != toggleNav) {
            hideMenu();
        }
}
hamburger.addEventListener("click", showMenu);
x.addEventListener("click", hideMenu);
window.addEventListener("mouseup", clickOut);