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