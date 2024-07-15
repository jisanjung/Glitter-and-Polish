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
        var inquiry = $("#inquery");

        $(".submit-message").css("display", "block");

        if (!requestDate.val() || !requestTime.val() || !name.val() || !email.val() || !phone.val() || !service.val()) {
            $(".submit-message").html("Please fill in all input fields");
            $(".submit-message").removeClass("success");
            $(".submit-message").addClass("danger");
        } else if (!isEmailValid(email.val())) {
            $(".submit-message").html("Email is invalid");
            $(".submit-message").removeClass("success");
            $(".submit-message").addClass("danger");
        } else {
            const body = {
                requestDate: formatDate(requestDate.val()),
                requestTime: formatTimeTo12Hour(requestTime.val()),
                name: name.val(),
                email: email.val(),
                phone: phone.val(),
                service: service.val(),
                inquiry: inquiry.val(),
                datePosted: currentDate()
            };
            const reqOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // specify the content type as JSON
                  },
                body: JSON.stringify(body)
            };

            fetch("https://glitterpolishnails.com/api/add", reqOptions)
                .then(res => res.json())
                .then(data => {
                    if (!data.success) {
                        $(".submit-message").html("Something went wrong");
                        $(".submit-message").removeClass("success");
                        $(".submit-message").addClass("danger");
                    } else {
                        $("input").val("");
                        $("textarea").val("");
                        $(".submit-message").html("Thank you! Sent successfully");
                        $(".submit-message").addClass("danger");
                        $(".submit-message").addClass("success");
                    }
                });
        }
    });
});