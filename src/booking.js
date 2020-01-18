$(document).ready(function() {


    var date = new Validation("#date", /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/);
    date.isValid();

    var time = new Validation("#time", /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/);
    time.isValid();

    var name = new Validation("#name", /^[a-z ,.'-]+$/i);
    name.isValid();

    var email = new Validation("#email", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    email.isValid();

    var phone = new Validation("#phone", /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
    phone.isValid();


    // service select options
    var select = $("#select");

    // error handle when user leaves on default
    select.on("blur", function() {
        if ($(this).val() === "service") {
            $("#selectError").show();
        } else {
            $("#selectError").hide();
        }
    });


    // post data into database
    var button = $("#bookBtn");
    
    button.on("click", function(e) {
        e.preventDefault();

        var requestDate = $("#date");
        var requestTime = $("#time");
        var name = $("#name");
        var email = $("#email");
        var phone = $("#phone");
        var service = $("#select");
        var inquery = $("#inquery");
        var date = currentDate();

        $.ajax({
            method: "POST",
            url: "post.php",
            data: {
                requestDate: requestDate.val(),
                requestTime: requestTime.val(),
                name: name.val(),
                email: email.val(),
                phone: phone.val(),
                service: service.val(),
                inquery: inquery.val(),
                date: date
            },
            success: function(data) {
                window.scrollTo(0, 0);

                $(".submit-message").css("display", "block");

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
                    $(".submit-message").addClass("danger");
                    $(".submit-message").addClass("success");
                }
            }
        });
    });

    function currentDate() {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = d.getFullYear() + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.setSeconds();
        
        return output;
    }
    

});