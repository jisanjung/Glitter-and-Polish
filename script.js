$(document).ready(function() {
    //---------start----------
    
    // carousel
    $(".fade").slick({
        inifnite: true,
        speed: 500,
        cssEase: "linear",
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000
    });

    // toggle header style on scroll
    $(window).on("scroll", function(e) {
        var top = $(this).scrollTop();
        
        if (top > 0) {
            $("header").css({"top": "0", "background": "#000"});
        } else {
            $("header").css({"top": "20px", "background": "transparent"});
        }
    });

    //----------end------------
});