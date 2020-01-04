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


    // modal
    (function modalFunc() {
        var modal = {
            image: $("#image"),
            background: $("#modalBackground"),
            selectImage: function() {
                var modalImage = modal.image;

                this.background.css("display", "block");
                this.image.css("display", "block");

            },
            clickOut: function() {
                this.background.css("display", "none");
                this.image.css("display", "none");
            }
        };

        $(".img").each(function(i) {
            $(this).on("click", function() {
                // changes the "this" reference to modal object
                // shows clicked image
                modal.selectImage.call(modal);

                // attaches clicked img src to the modal's src
                modal.image.attr("src", this.src);
            });
        });
        modal.background.on("click", function() {
            modal.clickOut.call(modal);
        });
    })();


    // toggle services tables
    $(".service-item button").on("click", function() {
        var thisTable = $(this).parent().find(".table-wrap");
        var text = $(this).text();

        thisTable.stop().slideToggle();
        $(".table-wrap").not(thisTable).slideUp();
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


    // contact validation
    var name = new Validation("#name", /^[a-z ,.'-]+$/i);
    var email = new Validation("#email", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var subject = new Validation("#subject", /^\s*\S+.*/);
    var message = new Validation("#message", /^\s*\S+.*/);
    name.isValid();
    email.isValid();
    subject.isValid();
    message.isValid();

    //----------end------------
});