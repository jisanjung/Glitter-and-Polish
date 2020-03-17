<?php
    $conn = new mysqli("localhost", "jisanjun_jjung", "456pickupsticks.", "jisanjun_orders") or die("error");

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
        $date = $_POST["date"];

        if (empty($requestDate) || empty($requestTime) || empty($name) || empty($email) || empty($phone) || empty($service)) {
            echo "incomplete";
        } else {
            $query = "insert into appointments(request_date, request_time, name, email, phone, service, inquery, date_posted) values('$requestDate', '$requestTime', '$name', '$email', '$phone', '$service', '$inquery', '$date')";

            $result = mysqli_query($conn, $query);

            if (!$result) {
                echo "fail";
            } else {
                echo "pass";
            }
        }
    }
?>