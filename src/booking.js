import { postOrder } from "../orders/src/helpers.js";

async function postEmailFormSpree(e, body) {
    const data = {
        Date: body.requestDate,
        Time: body.requestTime,
        Name: body.name,
        Email: body.email,
        Phone: body.phone,
        Service: body.service,
        Note: body.inquiry,
    };
    const res = await fetch(e.target.action, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
        }
    });
    
    return res.ok;
}

async function handleSubmit(e) {
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
            request_date: formatDate(requestDate.val()),
            request_time: formatTimeTo12Hour(requestTime.val()),
            name: name.val(),
            email: email.val(),
            phone: phone.val(),
            service: service.val(),
            inquery: inquiry.val(),
            date_posted: currentDate()
        };

        const postEmail = await postEmailFormSpree(e, body);
        postOrder(body); // fire and forget

        if (!postEmail) {
            $(".submit-message").html("Something went wrong");
            $(".submit-message").removeClass("success");
            $(".submit-message").addClass("danger");
        }
        // email post succeeded
        $("input").val("");
        $("textarea").val("");
        $(".submit-message").html("Thank you! Sent successfully");
        $(".submit-message").addClass("danger");
        $(".submit-message").addClass("success");
    }
}

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

    // post order into DB and email
    const bookingForm = $("#bookingForm");
    bookingForm.on("submit", handleSubmit);
});