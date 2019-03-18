var hamburger = document.getElementById("menu");
var toggleNav = document.getElementById("toggle-nav");
var x = document.getElementById("x");
var container = document.getElementsByClassName("blur");

function showMenu() {
    toggleNav.style.display = "block";
    
    for(var i = 0; i < container.length; i++) {
        container[i].style.filter = "blur(6px)";
    }
}
function hideMenu() {
    toggleNav.style.display = "none";
    
    for(var i = 0; i < container.length; i++) {
        container[i].style.filter = "blur(0)";
    }
}

hamburger.addEventListener("click", showMenu);
x.addEventListener("click", hideMenu);