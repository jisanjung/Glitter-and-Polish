//----------------------------------------------------------------


getOrder();

$("#newOrder").on("click", function() {
    window.location.reload(true);
    getOrder();
});

// each order gets pushed into this array
var orderList = [];

// order class
var Order = function(name, email, phone, request_date, request_time, service, inquery, date_posted) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.request_date = request_date;
    this.request_time = request_time;
    this.service = service;
    this.inquery = inquery;
    this.date_posted = date_posted;

    this.convertDate = function() {
        var request = moment(this.request_date, "YYYY-MM-DD");
        var posted = moment(this.date_posted, "YYYY-MM-DD hh:mm:ss");
        var time = moment(this.request_time, "HH:mm:ss");

        return {
            requestDate: request.format("MMMM Do, YYYY"),
            postedDate: posted.format("MMMM Do YYYY hh:mma"),
            fromNow: posted.fromNow(),
            time: time.format("h:mma")
        };
    }
}

// ajax
function getOrder() {
    $.ajax({
        method: "GET",
        url: "get.php",
        dataType: "json",
        success: function(data) {
            $.each(data, function(i, order) {
                orderList.push(new Order(order.name, order.email, order.phone, order.request_date, order.request_time, order.service, order.inquery, order.date_posted));

                handleData(i, orderList);
            });

            handleStatus();
        }
    });
}


// apply data to DOM
function handleData(i, data) {
    $("#orders").append("<li class='each-order'><span class='order-item'><span class='category'>Name: </span>"+ data[i].name +"</span><span class='order-item'><span class='category'>Email: </span>"+ data[i].email +"</span><span class='order-item'><span class='category'>Phone: </span>"+ data[i].phone +"</span><span class='order-item'><span class='category'>Requested Date: </span>"+ data[i].convertDate().requestDate +"</span><span class='order-item'><span class='category'>Requested Time: </span>"+ data[i].convertDate().time +"</span><span class='order-item'><span class='category'>Type of Service: </span>"+ data[i].service +"</span><span class='order-item'><span class='category'>Inquery: </span>"+ data[i].inquery +"</span><i class='status'>"+ data[i].convertDate().fromNow +"</i></li>");
}


// change text color depending on hwo much time has passed
function handleStatus() {
    $(".status").each(function() {
        if ($(this).text().includes("second") || $(this).text().includes("minute")) {
            $(this).css("color", "green");
            $(this).append("<span>new</span>");
        } else if ($(this).text().includes("hour")) {
            $(this).css("color", "orange");
        } else if ($(this).text().includes("day") || $(this).text().includes("week") || $(this).text().includes("month") || $(this).text().includes("year")) {
            $(this).css("color", "red");
            $(this).append("<span>late</span>");
        }
    });
}


//----------------------------------------------------------------