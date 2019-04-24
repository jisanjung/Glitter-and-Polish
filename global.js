//menu toggle
var hamburger = document.getElementById("menu");
var toggleNav = document.getElementById("toggle-nav");
var x = document.getElementById("x");
var blur = document.getElementsByClassName("blur");

function showMenu() {
    toggleNav.style.transform = "translateX(-100%)";
    
//    for(var i = 0; i < blur.length; i++) {
//        blur[i].style.filter = "blur(6px)";
//    }
}
function hideMenu() {
    toggleNav.style.transform = "translateX(100%)";
    
//    for(var i = 0; i < blur.length; i++) {
//        blur[i].style.filter = "blur(0)";
//    }
}
hamburger.addEventListener("click", showMenu);
x.addEventListener("click", hideMenu);