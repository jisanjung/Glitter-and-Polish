<?php
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
        // send appointment to email
        $to = 'sandra2938@gmail.com';
        $subject = 'Message from: '.$name;
        $txt = "New Appointment from {$name}\n
                Name: {$name}\n
                Email: {$email}\n
                Phone: {$phone}\n
                Requested Date: {$requestDate}\n
                Request Time: {$requestTime}\n
                Service: {$service}\n
                Message from Customer: {$inquery}\n\n
                Sent on {$date}";
        $headers = "From: ".$email;

        if (mail($to, $subject, $txt, $headers)) {
            echo "pass";
        } else {
            echo "fail";
        }

        // send appointment to db
        $conn = new mysqli("localhost", "jisanjun_jjung", "456pickupsticks.", "jisanjun_orders") or die("error");

        $query = "insert into appointments(request_date, request_time, name, email, phone, service, inquery, date_posted) values('$requestDate', '$requestTime', '$name', '$email', '$phone', '$service', '$inquery', '$date')";

        $result = mysqli_query($conn, $query);
    }
?>