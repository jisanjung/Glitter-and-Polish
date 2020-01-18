//----------------------------------------------------------------


getOrder();

$("#newOrder").on("click", function() {
    $("#orders").empty();
    getOrder();
});

function getOrder() {
    $.ajax({
        method: "GET",
        url: "get.php",
        dataType: "json",
        success: function(data) {
            $.each(data, function(i, order) {
                $("#orders").append("<li class='each-order'>"+ 
                    "<span class='order-item'>"+ order.name +"</span>"+
                    "<span class='order-item'>"+ order.email +"</span>"+
                    "<span class='order-item'>"+ order.phone +"</span>"+
                    "<span class='order-item'>"+ order.request_date +"</span>"+
                    "<span class='order-item'>"+ order.service +"</span>"+
                    "<span class='order-item'>"+ order.inquery +"</span>"+
                    "<i class='order-item'>"+ order.date_posted +"</i>"
                +"</li>");
            });
        }
    });
}


//----------------------------------------------------------------