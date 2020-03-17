<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/styles.css">
        <link rel="stylesheet" href="css/other.css">
        <link rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class="other-showcase" id="showcaseID">
            <!--header-->
            <?php
                include "header.php";
            ?>
        </div>

        <!--section divider-->
        <div class="section-divider">
            <div>
                <h3 class="vertical-center oswald-sans">
                    <span><a href="index.html">HOME</a></span>
                    <span>\</span>
                    <span>ABOUT US</span>
                </h3>
            </div>
        </div>

        <!--back to top-->
        <a href="#showcaseID" class="back-to-top cursor-pointer"></a>

        <main class="about-main">
            <div class="grid-wrap">
                <img src="images/welcomedesk.JPEG" class="img img-temp">
                <h1 class="playfair-serif">Welcome to Glitter & Polish</h1>
                <div class="right-column">
                    <p class="open-sans">
                        We want to give our best efforts when it comes to services. Our technicians are trained to provide comforting, excellent service as well as leaving you with beautiful looking nails.  We want to give back our friendliest service while providing you with a professional and modern look. Our spas are luxurious and pristine even after a hard day of work!
                    </p>
                    <p class="open-sans">
                        Here at Glitter and Polish, we provide services such as painless Acrylic Nail Removal, Classic Manicures for everyday use, Eyebrow services, Gel fill-in, gorgeous nail art, Hot Oil treatments, Nail repair for those pesky nails that did not make out, callus removal, Classic Pedicures, Gel Nail removal, Nail Art removal, Polish Change, and foot massages amongst many more services.
                    </p>
                </div>
            </div>
        </main>

        <!--book-->
        <div class="section book">
            <div class="book-divider"></div>
            <h1 class="text-white title text-center">Book with us today</h1>
            <div class="tint"></div>
            <a href="book" class="btn btn-black text-center">BOOK NOW</a>
        </div>

        <!--footer-->
        <?php
            include "footer.php";
        ?>
        <!--javascript-->
        <script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous"></script>
        <script src="src/global.js"></script>
    </body>
</html>