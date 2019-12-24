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

    // leaflet map
    (function setMap() {
        var mymap = L.map('mapid').setView([40.0423, -75.4819], 13);
        
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/           copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
        var marker = L.marker([40.0423, -75.4819]).addTo(mymap);
        marker.bindPopup("39 W Lancaster Avenue <br> Paoli, PA 19301").openPopup();
    })();


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


    // form validation
    (function formValid() {

        // constructor
        var Validation = function(id, regex) {
            this.id = id;
            this.regex = regex;
        };

        // method 1 - validate regular expression
        Validation.prototype.isValid = function() {
            var inputType = $(this.id);
            var regExp = this.regex;
            var error = this.id + "Error";

            inputType.on("blur", function() {
                if (!regExp.test(inputType.val())) {
                    $(this).css("border", "1px solid red");
                    $(error).show();
                } else {
                    $(this).css("border", "1px solid #ccc");
                    $(error).hide();
                }
            });
            inputType.on("focus", function() {
                if (regExp.test(inputType.val())) {
                    $(this).css("border", "1px solid #ccc");
                    $(error).hide();
                }
            });
        };
        
        // method 2 - check for empty input
        Validation.prototype.isEmpty = function() {
            var inputType = $(this.id);
            var regExp = this.regex;
            var error = this.id + "Error";

            inputType.on("blur", function() {
                if (inputType.val() === "" || inputType.val() === null || inputType.val() === undefined) {
                    $(this).css("border", "1px solid red");
                    $(error).show();
                } else {
                    $(this).css("border", "1px solid #ccc");
                    $(error).hide();
                }
            });
            inputType.on("focus", function() {
                if (inputType.val() !== "" || inputType.val() !== null || inputType.val() !== undefined) {
                    $(this).css("border", "1px solid #ccc");
                    $(error).hide();
                }
            });
        };

        var name = new Validation("#name", /^[a-z ,.'-]+$/i);
        var email = new Validation("#email", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        var subject = new Validation("#subject", "");
        var message = new Validation("#message", "");
        name.isValid();
        email.isValid();
        subject.isEmpty();
        message.isEmpty();
        
    })();

    //----------end------------
});