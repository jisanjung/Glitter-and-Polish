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
                    <span>OUR STAFF</span>
                </h3>
            </div>
        </div>

        <!--back to top-->
        <a href="#showcaseID" class="back-to-top cursor-pointer"></a>

        <!--main section-->
        <main class="staff">
            <h1 class="title text-center">Meet Our Staff</h1>
            <div class="divider"></div>

            <div class="staff-profile grid-wrap open-sans">
                <img src="images/carousel1.jpg" class="img img-test">
                <h1>Cindy Sandy</h1>
                <h3>Nail Tech</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque reiciendis perferendis, veritatis architecto sequi molestiae, sapiente cupiditate optio ullam eius, non magnam aliquam unde? Ipsum molestiae iure qui repudiandae.
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam deserunt dignissimos inventore exercitationem modi dolorem. Sapiente necessitatibus nemo mollitia optio minima consequatur minus, accusantium, distinctio hic dolore ut consequuntur delectus quae repellat quis in ipsa. Rerum placeat eum veniam, esse!
                    </span>
                </p>
            </div>

            <div class="staff-profile grid-wrap open-sans">
                <img src="images/carousel1.jpg" class="img img-test">
                <h1>Cindy Sandy</h1>
                <h3>Nail Tech</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque reiciendis perferendis, veritatis architecto sequi molestiae, sapiente cupiditate optio ullam eius, non magnam aliquam unde? Ipsum molestiae iure qui repudiandae.
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam deserunt dignissimos inventore exercitationem modi dolorem. Sapiente necessitatibus nemo mollitia optio minima consequatur minus, accusantium, distinctio hic dolore ut consequuntur delectus quae repellat quis in ipsa. Rerum placeat eum veniam, esse!
                    </span>
                </p>
            </div>

            <div class="staff-profile grid-wrap open-sans">
                <img src="images/carousel1.jpg" class="img img-test">
                <h1>Cindy Sandy</h1>
                <h3>Nail Tech</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eaque reiciendis perferendis, veritatis architecto sequi molestiae, sapiente cupiditate optio ullam eius, non magnam aliquam unde? Ipsum molestiae iure qui repudiandae.
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam deserunt dignissimos inventore exercitationem modi dolorem. Sapiente necessitatibus nemo mollitia optio minima consequatur minus, accusantium, distinctio hic dolore ut consequuntur delectus quae repellat quis in ipsa. Rerum placeat eum veniam, esse!
                    </span>
                </p>
            </div>

        </main>

        <!--book-->
        <div class="section book">
            <div class="book-divider"></div>
            <h1 class="text-white title text-center">Book with us today</h1>
            <div class="tint"></div>
            <a href="book.php" class="btn btn-black text-center">BOOK NOW</a>
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