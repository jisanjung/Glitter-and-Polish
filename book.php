<?php
    $valid = "";
    if (isset($_POST['submit'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $individual_or_group = $_POST['individual-or-group'];
        $people = $_POST['people'];
        $date = $_POST['date'];
        $msg = $_POST['message'];
        
        if (!empty($name) && !empty($email) && !empty($msg) && !empty($individual_or_group)) {
            echo "passed";
            
            $to = 'jjsk8er13@gmail.com';
            $subject = 'APPOINTMENT FOR '.$name;
            $message = "Name: ".$name."\n"."Email: ".$email."\n"."Phone Number: ".$phone."\n"."Individual or Group: ".$individual_or_group."\n"."Number of People: ".$people."\n"."Date: ".$date."\n"."Message: "."\n".$msg;
            $headers = "From: ".$email;

            if (mail($to, $subject, $message, $headers)) {
                $valid = "thank you";
            } else {
                $valid = "failed";
            }
        } else {
            echo "please enter all fields";
        }
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Glitter and Polish | Services</title>
        <link rel="stylesheet" href="glitter-styles.css" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Parisienne" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Ovo" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Spinnaker" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Ubuntu+Condensed" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Chau+Philomene+One" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Signika+Negative" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Aguafina+Script" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Unica+One" rel="stylesheet">
    </head>
    <body>
        <div id="container">
            <header class="blur">
                <h1><a href="index.html">Glitter & Polish</a></h1>
                <h4>nail spa</h4>
            </header>
            <nav class="blur">
                <img src="images/iconfinder_call_322424.png" alt="call" id="call">
                <a href="tel:484-329-7989" id="phone-number">484 - 329 - 7989</a>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="service.html">Services</a></li>
                    <li><a href="book.php">Book Online</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
                <img src="images/iconfinder_menu_3671806.png" alt="menu" id="menu">
            </nav>
            <div id="toggle-nav">
                <div id="wrapper">
                    <img src="images/cross.png" alt="x" id="x">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="service.html">Services</a></li>
                        <li><a href="book.php">Book Online</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <?php if($valid != ""): ?>
                <div class="success"><?php echo $valid; ?></div>
            <?php endif; ?>
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" class="main-form" id="book-form" name="form" method="post">
                <input type="text" name="name" id="name" placeholder="Name *">
                <input type="email" name="email" id="name" placeholder="Email *">
                <input type="phone" name="phone" id="phone-number" placeholder="Phone No. *">
                    <br>
                <input type="radio" name="individual-or-group" id="individual" value="individual" checked="checked">
                <label>Individual *</label>
                <input type="radio" name="individual-or-group" id="group" value="group">
                <label>Group *</label>
                <input type="number" name="people" id="people" placeholder="Number of People *">
                <input type="datetime" name="date" id="date" placeholder="Date/Time *">
                <textarea name="message" id="message" placeholder="Types of Services *"></textarea>
                    <br>
                <button type="submit" name="submit" id="submit">Submit</button>
            </form>
            <footer id="services-footer" class="blur">
                <h1>
                THANK YOU
                    <br>
                FOR CHOOSING GLITTER & POLISH
                    <br>
                    NAIL SPA
                </h1>
                <ul>
                    <li><a href="#"><img src="images/iconfinder_social_media_logo_yelp_1221590.png" alt="yelp" class="icons"></a></li>
                    <li><a href="#"><img src="images/iconfinder_Gplus_3380452.png" alt="google-plus" class="icons"></a></li>
                    <li><a href="#"><img src="images/iconfinder_2_-_Facebook_1774980.png" alt="facebook" class="icons"></a></li>
                </ul>
                <div class="copyright">
                    <p>&copy; 2018 by Glitter & Polish</p>
                </div>
            </footer>
        </div>
    </body>
    <script src="global.js"></script>
</html>