<?php
    if (isset($_POST['submit'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $individual_or_group = $_POST['individual-or-group'];
        $people = $_POST['people'];
        $date = $_POST['date'];
        $msg = $_POST['message'];
        $success = "";
        $failed = "";
        
        $to = 'jjsk8er13@gmail.com';
        $subject = 'APPOINTMENT FOR ' + $name;
        $message = "Name: ".$name."\n"."Email: ".$email."\n"."Phone Number: ".$phone."\n"."Individual or Group: ".$individual_or_group."\n"."Number of People: ".$people."\n"."Date: ".$date."\n"."Message: "."\n".$msg;
        $headers = "From: ".$email;
        
        if (mail($to, $subject, $message, $headers)) {
            $success = "Sent successfully! Thank you for making an appointment.";
        } else {
            $failed = "Error: Something went wrong.";
        }
    }
?>