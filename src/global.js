$(document).ready(function() {
    //---------start----------


    // toggle header style on scroll
    $(window).on("scroll", function(e) {
        var top = $(this).scrollTop();
        
        // header
        if (top > 1) {
            $("header").css({"top": "0", "background": "#000"});
        } else {
            $("header").css({"top": "150px", "background": "transparent"});
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
        $(".mobile-nav").slideToggle();
    });


    //----------end------------
});