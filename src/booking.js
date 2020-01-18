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

        $.ajax({
            method: "POST",
            url: "appointments.php",
            data: {
                requestDate: requestDate.val(),
                requestTime: requestTime.val(),
                name: name.val(),
                email: email.val(),
                phone: phone.val(),
                service: service.val(),
                inquery: inquery.val()
            },
            success: function(data) {
                console.log(data);
            }
        });
    });
    

});