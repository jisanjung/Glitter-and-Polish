//menu toggle
var hamburger = document.getElementById("menu");
var toggleNav = document.getElementById("toggle-nav");
var x = document.getElementById("x");
var blur = document.getElementsByClassName("blur");

function showMenu() {
    toggleNav.style.display = "block";
    
    for(var i = 0; i < blur.length; i++) {
        blur[i].style.filter = "blur(6px)";
    }
}
function hideMenu() {
    toggleNav.style.display = "none";
    
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

//gallery
var slides = document.getElementsByClassName("slides");
var rightArrow = document.getElementById("right");
var leftArrow = document.getElementById("left");
var heading = document.getElementById("friendly");
var current = 0;

function reset() {
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
}
function start() {
    reset();
    
    slides[0].style.display = "block";
}
function leftClick() {
    reset();
    
    slides[current - 1].style.display = "block";
    current--;
}
function rightClick() {
    reset();
    
    slides[current + 1].style.display = "block";
    current++;
}
leftArrow.addEventListener("click", function() {
    if (current === 0) {
        current = slides.length;
        }
    leftClick();
})
rightArrow.addEventListener("click", function() {
    if (current === slides.length - 1) {
        current = -1;
        }
    rightClick();
});

start();