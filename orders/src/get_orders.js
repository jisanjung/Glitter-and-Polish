//----------------------------------------------------------------
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';
import { db } from "../../server/firebase.js";

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
async function getOrder() {

    const res = await getDocs(collection(db, 'orders'));
    const data = res?.docs.map(order => ({...order?.data(), id: order?.id}));
    
    data.forEach((val, i) => {
        console.log(val);
        orderList.push(new Order(val));
        handleData(i, orderList);
    });

    handleStatus();

    // $.ajax({
    //     method: "GET",
    //     url: "get.php",
    //     dataType: "json",
    //     success: function(data) {
    //         $.each(data, function(i, order) {
    //             orderList.push(new Order(order.name, order.email, order.phone, order.request_date, order.request_time, order.service, order.inquery, order.date_posted));

    //             handleData(i, orderList);
    //         });

    //         handleStatus();
    //     }
    // });
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