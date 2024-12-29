//----------------------------------------------------------------
import { getAllOrders } from './helpers.js';

// immediately invoke
(async () => {
    await getOrder();
})().catch(err => {
    console.error(err);
});

$("#newOrder").on("click", function() {
    window.location.reload(true);
});

// each order gets pushed into this array
var orderList = [];

// order class
var Order = function({ name, email, phone, request_date, request_time, service, inquery, date_posted }) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.request_date = request_date;
    this.request_time = request_time;
    this.service = service;
    this.inquery = inquery;
    this.date_posted = date_posted;

    this.convertDate = function() {
        var posted = moment(this.date_posted, "YYYY-MM-DD hh:mm:ss");
        var time = moment(this.request_time, "HH:mm:ss");

        return {
            requestDate: request_date,
            postedDate: posted.format("MMMM Do YYYY hh:mma"),
            fromNow: posted.fromNow(),
            time: time.format("h:mma")
        };
    }
}

// ajax
async function getOrder() {
    const data = await getAllOrders();
    
    // sort first
    data.sort((a, b) => {
        const dateA = new Date(a.date_posted).getTime();
        const dateB = new Date(b.date_posted).getTime();

        return dateB - dateA;
    });
    
    // then paint data to ui
    data.forEach((val, i) => {
        orderList.push(new Order(val));
        handleData(i, orderList);
    });

    handleStatus();
}


// apply data to DOM
function handleData(i, data) {
    $("#orders").append("<tr><td>"+ data[i].name +"</td><td>"+ data[i].email +"</td><td>"+ data[i].phone +"</td><td>"+ data[i].convertDate().requestDate +"</td><td>"+ data[i].convertDate().time +"</td><td>"+ data[i].service +"</td><td>"+ data[i].inquery +"</td><td class='status'>"+ data[i].convertDate().fromNow +"</td></tr>");
}


// change text color depending on hwo much time has passed
function handleStatus() {
    $(".status").each(function() {
        if ($(this).text().includes("second") || $(this).text().includes("minute")) {
            $(this).addClass("text-success");
        } else if ($(this).text().includes("hour")) {
            $(this).addClass("text-warning");
        } else if ($(this).text().includes("day") || $(this).text().includes("week") || $(this).text().includes("month") || $(this).text().includes("year")) {
            $(this).addClass("text-danger");
        }
    });
}


//----------------------------------------------------------------