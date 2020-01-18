
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
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
                    <a href="book.php" class="btn-blue">SCHEDULE AN APPOINTMENT</a>
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
                    <img class="img img-temp">
                    <div class="about-text">
                        <p class="open-sans text-gray p-text">Lorem ipsum dolor sit amet, ludus maluisset his cu, ut prodesset posidonium nam, quo facilisis democritum eloquentiam at. Pri ad ipsum assueverit, cu sea possim concludaturque. No eos aliquid phaedrum, ex viderer salutandi mea. In has prima assum voluptatibus.</p>
                        <p class="open-sans text-gray p-text">Vel eros option mediocrem no. In quidam dolorem mei, in ornatus sententiae percipitur has. Cu vim amet singulis, mei saepe ceteros partiendo ex. Eam tation eirmod ei, utamur delectus vis id. Iudico maiestatis mea ut, ne admodum consulatu mea, suas tamquam
                            vis at.</p>
                        <p class="open-sans text-gray p-text">Mea graece labitur ad, eripuit explicari concludaturque mel te. Falli patrioque splendide te pri, vim ubique virtute ponderum no.</p>
                        <a href="#showcaseID" class="back-to-top cursor-pointer">
                        </a>
                        <a href="#" class="btn btn-white text-decoration text-center">READ MORE</a>
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
                       <h1 class="playfair-serif light text-center">Pedicure</h1>
                       <p class="open-sans p-text text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, corrupti ipsa. Dolore minima quod sunt eveniet.</p>

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
                       <h1 class="playfair-serif light text-center">Nail Repair</h1>
                       <p class="open-sans p-text text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, corrupti ipsa. Dolore minima quod sunt eveniet.</p>

                       <div class="table-wrap">
                        <table class="oswald-sans gray-table">
                            <tr>
                                <td>POLISH CHANGE</td>
                                <td>$10</td>
                            </tr>
                            <tr>
                                <td>REGULAR MANICURE</td>
                                <td>$14</td>
                            </tr>
                            <tr>
                                <td>HOT OIL MANICURE</td>
                                <td>$20</td>
                            </tr>
                            <tr>
                                <td>GEL POLISH CHANGE</td>
                                <td>$25</td>
                            </tr>
                            <tr>
                                <td>REGULAR GEL MANICURE</td>
                                <td>$30</td>
                            </tr>
                            <tr>
                                <td>ORGANIC SPA MANICURE</td>
                                <td>$25</td>
                            </tr>
                            <tr>
                                <td>EXTENDED WEAR POLISH</td>
                                <td>+$3</td>
                            </tr>
                            <tr>
                                <td>DESIGN</td>
                                <td>+$3 & up</td>
                            </tr>
                            <tr>
                                <td>FRENCH/AMERICAN</td>
                                <td>+$5</td>
                            </tr>
                        </table>
                       </div>

                       <button type="button" class="oswald-sans">READ MORE</button>
                   </div>
                   <div class="service-item">
                       <h1 class="playfair-serif light text-center">Nail Art</h1>
                       <p class="open-sans p-text text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, corrupti ipsa. Dolore minima quod sunt eveniet.</p>

                       <div class="table-wrap">
                        <table class="oswald-sans blue-table">
                            <tr>
                                <td>POLISH CHANGE</td>
                                <td>$15</td>
                            </tr>
                            <tr>
                                <td>EXPRESS PEDICURE</td>
                                <td>$25</td>
                            </tr>
                            <tr>
                                <td>REGULAR PEDICURE</td>
                                <td>$30</td>
                            </tr>
                            <tr>
                                <td>SIGNATURE SPA PEDICURE</td>
                                <td>$37</td>
                            </tr>
                            <tr>
                                <td>PREMIUM SPA PEDICURE</td>
                                <td>$47</td>
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
                                <td>+$3 & up</td>
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
                       <h1 class="playfair-serif light text-center">Toe Nail Polish</h1>
                       <p class="open-sans p-text text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, corrupti ipsa. Dolore minima quod sunt eveniet.</p>

                       <div class="table-wrap">
                        <table class="oswald-sans gray-table">
                            <tr>
                                <td>POLISH CHANGE FINGERS/TOES</td>
                                <td>$6/$10</td>
                            </tr>
                            <tr>
                                <td>REGULAR MANICURE</td>
                                <td>$10</td>
                            </tr>
                            <tr>
                                <td>REGULAR PEDICURE</td>
                                <td>$20</td>
                            </tr>
                            <tr>
                                <td>EXTENDED WEAR POLISH</td>
                                <td>+$3</td>
                            </tr>
                            <tr>
                                <td>DESIGN</td>
                                <td>+$1 & up</td>
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
                    <img class="img img-temp">
                    <img class="img img-temp">
                    <img class="img img-temp">
                    <img class="img img-temp">
                    <img class="img img-temp">
                    <img class="img img-temp">
                    <img class="img img-temp">
                </div>
            </div>

            <!--modal-->
            <div id="modalBackground"></div>
            <img src="" alt="Selected Image" class="center-all" id="image">

            <!--book-->
            <div class="section book">
                <div class="book-divider"></div>
                <h1 class="text-white title text-center">Book with us today</h1>
                <div class="tint"></div>
                <a href="book.php" class="btn btn-black text-center">BOOK NOW</a>
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