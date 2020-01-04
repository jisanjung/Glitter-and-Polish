$(document).ready(function() {

    var date = new Validation("#date", /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/);
    date.isValid();

    var time = new Validation("#time", /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/);
    time.isValid();

    var name = new Validation("#name", /^[a-z ,.'-]+$/i);
    name.isValid();

    var email = new Validation("#email", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    email.isValid();

    var phone = new Validation("#phone", /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
    phone.isValid();

    // validate select dropdown
    var select = $("#select");

    select.on("blur", function() {
        if (select.val() === "service") {
            $("#selectError").show();
        } else {
            $("#selectError").hide();
        }
    });

});