$(document).ready(function() {
    //---------start----------
    
    // carousel
    $(".fade").slick({
        inifnite: true,
        speed: 500,
        cssEase: "linear",
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false
    });

    // toggle header style on scroll
    $(window).on("scroll", function(e) {
        var top = $(this).scrollTop();
        
        // header
        if (top > 0) {
            $("header").css({"top": "0", "background": "#000"});
        } else {
            $("header").css({"top": "20px", "background": "transparent"});
        }

        // reveal button takes you back to top
        if (top > 1000) {
            $(".back-to-top").css("right", "0px");
        } else {
            $(".back-to-top").css("right", "-50px");
        }
    });

    // toggle nav menu
    $(".menu").on("click", function() {
        $("nav").slideToggle();
    });

    // smooth scroll
    $('a[href*=\\#]').on('click', function(event){     
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
    });

    //----------end------------
});