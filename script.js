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
        var isValid = {
            name: function() {
                var name = $("#name");

                name.on("blur", function() {
                    if (!/^[a-z ,.'-]+$/i.test(name.val())) {
                        $(this).css("border", "1px solid red");
                        $("#nameError").show();
                    } else {
                        $(this).css("border", "1px solid #ccc");
                        $("#nameError").hide();
                    }
                });
                name.on("focus", function() {
                    if (/^[a-z ,.'-]+$/i.test(name.val())) {
                        $(this).css("border", "1px solid #ccc");
                        $("#nameError").hide();
                    }
                });
            },
            email: function() {
                var email = $("#email");

                email.on("blur", function() {
                    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.val())) {
                        $(this).css("border", "1px solid red");
                        $("#emailError").show();
                    } else {
                        $(this).css("border", "1px solid #ccc");
                        $("#emailError").hide();
                    }
                });
                email.on("focus", function() {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.val())) {
                        $(this).css("border", "1px solid #ccc");
                        $("#emailError").hide();
                    }
                });
            },
            subject: function() {
                var subject = $("#subject");

                subject.on("blur", function() {
                    if (subject.val() === "" || subject.val() === null || subject.val() === undefined) {
                        $(this).css("border", "1px solid red");
                        $("#subjectError").show();
                    } else {
                        $(this).css("border", "1px solid #ccc");
                        $("#subjectError").hide();
                    }
                });
                subject.on("focus", function() {
                    if (subject.val() !== "" || subject.val() !== null || subject.val() !== undefined) {
                        $(this).css("border", "1px solid #ccc");
                        $("#subjectError").hide();
                    }
                });
            },
            message: function() {
                var message = $("#message");

                message.on("blur", function() {
                    if (message.val() === "" || message.val() === null || message.val() === undefined) {
                        $(this).css("border", "1px solid red");
                        $("#messageError").show();
                    } else {
                        $(this).css("border", "1px solid #ccc");
                        $("#messageError").hide();
                    }
                });
                message.on("focus", function() {
                    if (message.val() !== "" || message.val() !== null || message.val() !== undefined) {
                        $(this).css("border", "1px solid #ccc");
                        $("#messageError").hide();
                    }
                });
            }
        };

        isValid.name();
        isValid.email();
        isValid.subject();
        isValid.message();
    })();

    //----------end------------
});