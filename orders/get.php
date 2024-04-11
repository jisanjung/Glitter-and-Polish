<?php
    $db_user = "glitterp_jisjung";
    $db_pass = "456pickupsticks.";
    $db_name = "glitterp_orders";

    $conn = new mysqli("localhost", $db_user, $db_pass, $db_name) or die("error");

    if (!$conn) {
        echo "connection error".mysqli_connect_error();
    } else {
        $query = "select * from appointments order by id desc";
        $result = mysqli_query($conn, $query);
        $json = array();

        while($row = mysqli_fetch_assoc($result)) {
            $json[] = $row;
        }

        echo json_encode($json);
    }
?>