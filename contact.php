<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "incomplete";
    } else {
        $to = 'jjsk8er13@gmail.com';
        $subject = 'Message from: '.$name;
        $txt = "Name: ".$name."\n"."Email: ".$email."\n"."Message: "."\n".$message;
        $headers = "From: ".$email;
        
        if (mail($to, $subject, $txt, $headers)) {
            echo "pass";
        } else {
            echo "fail";
        }
    }
?>