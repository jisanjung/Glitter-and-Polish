
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Glitter & Polish | Home</title>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/styles.css">
        <link rel="stylesheet" type="text/css">
        <link rel="stylesheet" type="text/css" href="slick/slick.css">
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin=""/>
        <link rel="shortcut icon" type="image/png" href="images/favicon.png">
    </head>
    <body>

    <!--showcase-->
    <div class="showcase" id="showcaseID">

        <!--header-->
        <?php
            include "header.php";
        ?>

        <!--carousel-->
        <div class="fade">
            <div><img src="images/carousel1.jpg" alt="Image 1">
                <p class="text-white center-all text-center playfair-serif showcase-text"><span class="first-child">your nails are</span></br><span>THE REFLECTION</span></br><span class="last-child">of yourself</span></p>
            </div>
            <div><img src="images/carousel2.jpg" alt="Image 2">
                <p class="text-white text-center center-all playfair-serif showcase-text"><span class="first-child">nails take</span></br><span>ANY OLD OUTFIT</span></br><span class="last-child">and make it new</span></p>
            </div>
            <div><img src="images/carousel3.jpg" alt="Image 3">
                <p class="text-white text-center center-all playfair-serif showcase-text"><span>TRUE BEAUTY</span></br><span class="last-child">comes from within</span>
                    <a href="book" class="btn-blue">SCHEDULE AN APPOINTMENT</a>
                </p>
            </div>
        </div>
    </div>

        <!--main content-->
        <main class="main">

             <!--about-->
             <div class="section about">
                <h1 class="title text-center">About Our Salon</h1>
                <div class="divider"></div>
                <div class="container-lg grid-wrap">
                    <img src="images/colors.JPG" class="img">
                    <div class="about-text">
                        <p class="open-sans text-gray p-text">Our salon provides excellent service with quality products. This can include waxing as well as premium manicures and pedicures. All ages are welcome as we also provide services for children 10 and under.</p>
                        <p class="open-sans text-gray p-text">When it comes to our clients, we don't cut corners. We give 100% of what is expected and what it is worth. Because of this, any feedback we receive is taken into consideration and improved upon.</p>
                        <p class="open-sans text-gray p-text">If you are looking for a clean, modern look to your everyday outfit, we are here to provide it. Experience your new look today!</p>
                        <a href="#showcaseID" class="back-to-top cursor-pointer">
                        </a>
                        <a href="about" class="btn btn-white text-decoration text-center">READ MORE</a>
                    </div>
                </div>
            </div>

            <!--side image 1-->
            <img src="images/side_img1.png" alt="Side Image - Purple Flower" class="side-img" id="side-img1">

            <!--services-->
            <div class="section services" id="servicesID">
                <h1 class="title text-center">Our Services</h1>
                <div class="divider"></div>
                <div class="grid-wrap">
                   <div class="service-item">
                       <h1 class="playfair-serif light text-center">Waxing</h1>
                       <p class="open-sans p-text text-center">We use sensitive-skin type products for facial wax in addition to our other services.</p>

                       <div class="table-wrap">
                        <table class="oswald-sans blue-table">
                            <tr>
                                <td>EYEBROW</td>
                                <td>$10</td>
                            </tr>
                            <tr>
                                <td>LIP</td>
                                <td>$8</td>
                            </tr>
                            <tr>
                                <td>CHIN</td>
                                <td>$12 & up</td>
                            </tr>
                            <tr>
                                <td>SIDEBURNS</td>
                                <td>$13</td>
                            </tr>
                            <tr>
                                <td>UNDERARM</td>
                                <td>$20</td>
                            </tr>
                            <tr>
                                <td>PARTIAL LEG</td>
                                <td>$40</td>
                            </tr>
                            <tr>
                                <td>FULL LEG</td>
                                <td>$60</td>
                            </tr>
                            <tr>
                                <td>PARTIAL ARM</td>
                                <td>$30</td>
                            </tr>
                            <tr>
                                <td>FULL ARM</td>
                                <td>$40</td>
                            </tr>
                            <tr>
                                <td>BIKINI</td>
                                <td>$35 & up</td>
                            </tr>
                            <tr>
                                <td>BRAZILIAN</td>
                                <td>$55 & up</td>
                            </tr>
                            <tr>
                                <td>FINGERS</td>
                                <td>$10</td>
                            </tr>
                            <tr>
                                <td>TOES</td>
                                <td>$10</td>
                            </tr>
                        </table>
                       </div>

                       <button type="button" class="oswald-sans">READ MORE</button>
                   </div>
                   <div class="service-item">
                       <h1 class="playfair-serif light text-center">Manicure</h1>
                       <p class="open-sans p-text text-center">We provide quick and effective polishes that do not require full cuticle maintenance!</p>

                       <div class="table-wrap">
                        <table class="oswald-sans gray-table">
                            <tr>
                                <td>POLISH CHANGE</td>
                                <td>$12</td>
                            </tr>
                            <tr>
                                <td>REGULAR MANICURE</td>
                                <td>$15</td>
                            </tr>
                            <tr>
                                <td>HOT OIL MANICURE</td>
                                <td>$20</td>
                            </tr>
                            <tr>
                                <td>GEL POLISH CHANGE</td>
                                <td>$28</td>
                            </tr>
                            <tr>
                                <td>REGULAR GEL MANICURE</td>
                                <td>$33</td>
                            </tr>
                            <tr>
                                <td>ORGANIC SPA MANICURE</td>
                                <td>$28</td>
                            </tr>
                            <tr>
                                <td>EXTENDED WEAR POLISH</td>
                                <td>+$3</td>
                            </tr>
                            <tr>
                                <td>DESIGN</td>
                                <td>+$5 & up</td>
                            </tr>
                            <tr>
                                <td>FRENCH/AMERICAN</td>
                                <td>+$5</td>
                            </tr>
                            <tr>
                                <td>DEEP POWDER</td>
                                <td>$42</td>
                            </tr>
                        </table>
                       </div>

                       <button type="button" class="oswald-sans">READ MORE</button>
                   </div>
                   <div class="service-item">
                       <h1 class="playfair-serif light text-center">Pedicure</h1>
                       <p class="open-sans p-text text-center">From simple trim and shape ups to deep sea-salt foot soaks, we provide premium services.</p>

                       <div class="table-wrap">
                        <table class="oswald-sans blue-table">
                            <tr>
                                <td>POLISH CHANGE</td>
                                <td>$18</td>
                            </tr>
                            <tr>
                                <td>EXPRESS PEDICURE</td>
                                <td>$28</td>
                            </tr>
                            <tr>
                                <td>REGULAR PEDICURE</td>
                                <td>$33</td>
                            </tr>
                            <tr>
                                <td>SIGNATURE SPA PEDICURE</td>
                                <td>$39</td>
                            </tr>
                            <tr>
                                <td>PREMIUM SPA PEDICURE</td>
                                <td>$49</td>
                            </tr>
                            <tr>
                                <td>GLITTER & POLISH SPECIAL</td>
                                <td>$62</td>
                            </tr>
                            <tr>
                                <td>EXTENDED WEAR POLISH</td>
                                <td>+$3</td>
                            </tr>
                            <tr>
                                <td>DESIGN</td>
                                <td>+$5 & up</td>
                            </tr>
                            <tr>
                                <td>FRENCH/AMERICAN</td>
                                <td>+$5</td>
                            </tr>
                            <tr>
                                <td>GEL POLISH ADD ON</td>
                                <td>+$16</td>
                            </tr>
                        </table>
                       </div>

                       <button type="button" class="oswald-sans">READ MORE</button>
                   </div>
                   <div class="service-item">
                       <h1 class="playfair-serif light text-center">Children 10 & Under</h1>
                       <p class="open-sans p-text text-center">Give your kids a fresh look with these affordable prices. They can look lavish as well!</p>

                       <div class="table-wrap">
                        <table class="oswald-sans gray-table">
                            <tr>
                                <td>POLISH CHANGE FINGERS/TOES</td>
                                <td>$7/$12</td>
                            </tr>
                            <tr>
                                <td>REGULAR MANICURE</td>
                                <td>$12</td>
                            </tr>
                            <tr>
                                <td>REGULAR PEDICURE</td>
                                <td>$22</td>
                            </tr>
                            <tr>
                                <td>EXTENDED WEAR POLISH</td>
                                <td>+$3</td>
                            </tr>
                            <tr>
                                <td>DESIGN</td>
                                <td>+$2 & up</td>
                            </tr>
                            <tr>
                                <td>FRENCH/AMERICAN</td>
                                <td>+$5</td>
                            </tr>
                            <tr>
                                <td>GEL POLISH ADD ON</td>
                                <td>+$16</td>
                            </tr>
                        </table>
                       </div>

                       <button type="button" class="oswald-sans">READ MORE</button>
                   </div>
                </div>
            </div>

            <!--gallery-->
            <div class="section gallery">
                <h1 class="title text-center">Gallery</h1>
                <div class="divider"></div>
                <div class="container-lg grid-wrap">
                    <div class="img-wrap overflow-hidden">
                        <img src="images/purpnails.jpg" class="img cursor-pointer">
                    </div>
                    <div class="img-wrap overflow-hidden">
                        <img src="images/glitternails.jpg" class="img cursor-pointer">
                    </div>
                    <div class="img-wrap overflow-hidden">
                        <img src="images/designnails.jpg" class="img cursor-pointer">
                    </div>
                    <div class="img-wrap overflow-hidden">
                        <img src="images/graynails.jpg" class="img cursor-pointer">
                    </div>
                    <div class="img-wrap overflow-hidden">
                        <img src="images/maroonnails.jpg" class="img cursor-pointer">
                    </div>
                    <div class="img-wrap overflow-hidden">
                        <img src="images/clientseats.JPG" class="img cursor-pointer">
                    </div>
                    <div class="img-wrap overflow-hidden">
                        <img src="images/blacknails.jpg" class="img cursor-pointer">
                    </div>
                </div>
            </div>

            <!--modal-->
            <div id="modalBackground" class="cursor-pointer"></div>
            <img src="" alt="Selected Image" class="center-all" id="image">

            <!--book-->
            <div class="section book">
                <div class="book-divider"></div>
                <h1 class="text-white title text-center">Book with us today</h1>
                <div class="tint"></div>
                <a href="book" class="btn btn-black text-center">BOOK NOW</a>
            </div>

            <!--contact-->
            <div class="section contact" id="contactID">
                <h1 class="title text-center">Contact Us</h1>
                <div class="divider"></div>
                <div class="grid-wrap">
                    <form id="contactForm" method="post">
                        <div>
                            <span id="nameError" class="error">Invalid name</span>
                            <input type="text" id="name" name="name" placeholder="Enter Name" class="input focused">
                            <span id="emailError" class="error">Invalid email</span>
                            <input type="email" id="email" name="email" placeholder="Enter Email" class="input focused">
                            <span id="subjectError" class="error">Cannot be blank</span>
                            <input type="text" id="subject" placeholder="Subject" class="input focused" name="subject">
                            <span id="messageError" class="error">Cannot be blank</span>
                            <textarea id="message" placeholder="Enter Message" class="input focused" name="message"></textarea>
                            <button type="submit" name="submit" class="btn btn-blue2 text-center cursor-pointer" id="submit">SEND YOUR MESSAGE</button>

                            <span class="submit-message"></span>
                        </div>
                    </form>
                    <div class="map">
                        <div class="container-lg">
                            <div id="mapid"></div>
                        </div>
                    </div>
                </div>
            </div>

        </main>

        <!--footer-->
        <?php
            include "footer.php";
        ?>

        <!--javascript-->
        <script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossorigin="anonymous"></script>
        <script type="text/javascript" src="slick/slick.min.js"></script>
        <script src="src/validation.js"></script>
        <script src="src/global.js"></script>
        <script src="src/home.js"></script>
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
        integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
        crossorigin=""></script>
    </body>
</html>