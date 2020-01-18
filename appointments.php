<?php
    $conn = new mysqli("localhost", "root", "", "bookings") or die("error");

    if (!$conn) {
        echo "connection error".mysqli_connect_error();
    } else {
        $requestDate = $_POST["requestDate"];
        $requestTime = $_POST["requestTime"];
        $name = $_POST["name"];
        $email = $_POST["email"];
        $phone = $_POST["phone"];
        $service = $_POST["service"];
        $inquery = $_POST["inquery"];

        if (empty($requestDate) || empty($requestTime) || empty($name) || empty($email) || empty($phone) || empty($service)) {
            echo "incomplete";
        } else {
            $query = "insert into appointments(request_date, request_time, name, email, phone, service, inquery) values('$requestDate', '$requestTime', '$name', '$email', '$phone', '$service', '$inquery')";

            $result = mysqli_query($conn, $query);

            if (!$result) {
                echo "data not inserted";
            } else {
                echo "data inserted";
            }
        }
    }
?>