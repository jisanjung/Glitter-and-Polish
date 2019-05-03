<?php
    $valid = "";
    $empty_form = "";
    
    if (isset($_POST['submit'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $msg = $_POST['message'];
        
        if (!empty($name) && !empty($email) && !empty($msg)) {
            $to = 'glitterpolishnailspa@gmail.com';
            $subject = 'COMMENT FROM: '.$name;
            $message = "Name: ".$name."\n"."Email: ".$email."\n"."Phone Number: ".$phone."\n"."Message: "."\n".$msg;
            $headers = "From: ".$email;
            
            if (mail($to, $subject, $message, $headers)) {
                $valid = "Thank you! Sent successfully";
            } else {
                $empty_form = "Error: Something went wrong";
            }
        } else {
            $empty_form = "Please fill in all the fields";
        }
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Glitter and Polish nail spa is the salon to go to when you need precise yet beautiful nails.">
        <meta name="keywords" content="glitter, polish, nails, spa, salon, gel">
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-139462509-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-139462509-1');
        </script>
        <title>Glitter and Polish | Contact</title>
        <link rel="stylesheet" href="styles.css" type="text/css">
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
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" />
    </head>
    <body>
        <div id="container" class="black">
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
                    <li><a href="specials.html">Specials</a></li>
                    <li><a href="book.php">Book Online</a></li>
                    <li><a href="contact.php">Contact Us</a></li>
                </ul>
                <img src="images/iconfinder_menu_3671806.png" alt="menu" id="menu">
            </nav>
            <div id="toggle-nav">
                <div id="wrapper">
                    <img src="images/cross.png" alt="x" id="x">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="service.html">Services</a></li>
                        <li><a href="specials.html">Specials</a></li>
                        <li><a href="book.php">Book Online</a></li>
                        <li><a href="contact.php">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <?php if($valid != ""): ?>
                <div class="success blur"><?php echo $valid; ?></div>
            <?php endif; ?>
            <?php if($empty_form != ""): ?>
                <div class="failed blur"><?php echo $empty_form; ?></div>
            <?php endif; ?>
            <section id="let-us-know" class="blur"><h1>Let us know what you think!</h1></section>
            <form class="main-form" id="contact-form" action="<?php echo $_SERVER['PHP_SELF']; ?>" name="form" method="post">
                <input type="text" name="name" id="name" placeholder="Full Name *" class="blur">
                <input type="email" name="email" id="name" placeholder="Email *" class="blur">
                <input type="phone" name="phone" id="phone-number" placeholder="Phone Number *" class="blur">
                <textarea name="message" id="message" placeholder="Questions & Comments Here *" rows="5" class="blur"></textarea>
                    <br>
                <button type="submit" name="submit" class="submit desktop-submit blur">Submit</button>
            </form>
            <section id="contact-info" class="blur">
                <ul>
                    <li>Glitter & Polish Nail Spa</li>
                    <li>39 W Lancaster Avenue</li>
                    <li>Paoli, PA 19301, USA</li>
                    <li>484.329.7989</li>
                    <li>484.329.7939</li>
                    <li>glitterpolishnailspa@gmail.com</li>
                    <li>Facebook/glitterpolishpaoli</li>
                    <li>Instagram @glitterpolishpaoli</li>
                </ul>
                <ul>
                    <li class="inline-logos"><a href="https://www.google.com/maps/place/Glitter+%26+Polish+Nail+Spa/@40.042293,-75.481851,15z/data=!4m5!3m4!1s0x0:0xef1286777b1874ec!8m2!3d40.042293!4d-75.481851s"><img src="images/iconfinder_Marker_red_1891013.png" alt="location"></a></li>
                    <li class="inline-logos"><a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=glitterpolishnailspa@gmail.coms"><img src="images/iconfinder_mail-icon_380447.png" alt="mail"></a></li>
                    <li class="inline-logos"><a href="https://www.facebook.com/glitterpolishpaoli/"><img src="images/iconfinder_circle-facebook__317752.png"></a></li>
                    <li class="inline-logos"><a href="https://www.instagram.com/glitterpolishpaoli/?hl=ens"><img src="images/iconfinder_circle-instagram_1312095.png"></a></li>
                </ul>
                <ul>
                    <li>Store Hours</li>
                    <li>Mon 9:30am - 7pm</li>
                    <li>Tues 9:30am - 7pm</li>
                    <li>Wed 9:30am - 7pm</li>
                    <li>Thurs 9:30am - 7pm</li>
                    <li>Fri 9:30am - 7pm</li>
                    <li>Sat 9am - 6pm</li>
                    <li>Sun 10am - 5pm</li>
                </ul>
            </section>
            <section id="map" class="blur"></section>
            <section class="notice blur" id="contact-notice">Additional parking available in rear parking lot</section>
            <footer id="contact-footer" class="blur">
                <h1>
                THANK YOU
                    <br>
                FOR CHOOSING GLITTER & POLISH
                    <br>
                    NAIL SPA
                </h1>
                <ul>
                    <li><a href="https://www.yelp.com/biz/glitter-and-polish-nail-spa-paoli"><img src="images/iconfinder_social_media_logo_yelp_1221590.png" alt="yelp" class="icons"></a></li>
                    <li><a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=glitterpolishnailspa@gmail.com"><img src="images/iconfinder_Gplus_3380452.png" alt="google-plus" class="icons"></a></li>
                    <li><a href="https://www.facebook.com/glitterpolishpaoli/"><img src="images/iconfinder_2_-_Facebook_1774980.png" alt="facebook" class="icons"></a></li>
                </ul>
                <div class="copyright">
                    <p>&copy; 2019 by Glitter & Polish</p>
                </div>
            </footer>
        </div>
        <script src="global.js"></script>
        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>
        <script src="map.js"></script>
    </body>
</html>