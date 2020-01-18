<?php
    $conn = new mysqli("localhost", "root", "", "bookings") or die("error");

    if (!$conn) {
        echo "connection error".mysqli_connect_error();
    } else {
        $query = "select * from appointments";
        $result = mysqli_query($conn, $query);
        $json = array();

        while($row = mysqli_fetch_assoc($result)) {
            $json[] = $row;
        }

        echo json_encode($json);
    }
?>