$(document).ready(function() {
    //---------start----------

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
        marker.bindPopup("39 E Lancaster Avenue <br> Paoli, PA 19301").openPopup();
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


    // contact form
    $("#submit").click(function(e) {
        e.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();

        // ajax
        $.post("contact.php", {
            name: name,
            email: email,
            subject: subject,
            message: message
        }, function(data) {
            var mql = window.matchMedia("(max-width: 451px)");

            if (mql.matches) {
                $(".submit-message").css({
                    "display" : "block",
                    "margin-left" : "0px",
                    "margin-top" : "10px",
                });
            } else {
                $(".submit-message").show();
            }

            if (data === "incomplete") {
                $(".submit-message").html("Please fill in all input fields");
                $(".submit-message").removeClass("success");
                $(".submit-message").addClass("danger");
            } else if (data === "fail") {
                $(".submit-message").html("Something went wrong");
                $(".submit-message").removeClass("success");
                $(".submit-message").addClass("danger");
            } else if (data === "pass") {
                $("input").val("");
                $("textarea").val("");
                $(".submit-message").html("Thank you! Sent successfully");
                $(".submit-message").removeClass("danger");
                $(".submit-message").addClass("success");
            }
        });
    });


    //----------end------------
});