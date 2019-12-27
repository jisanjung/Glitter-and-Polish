$(document).ready(function() {
    //---------start----------


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
        $(".mobile-nav").slideToggle();
    });


    // smooth scroll
    $('a[href*=\\#]').on('click', function(event){     
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
    });


    // leaflet map
    (function setMap() {
        var mymap = L.map('mapid').setView([40.0423, -75.4819], 13);
        
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/           copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
        var marker = L.marker([40.0423, -75.4819]).addTo(mymap);
        marker.bindPopup("39 W Lancaster Avenue <br> Paoli, PA 19301").openPopup();
    })();


    //----------end------------
});