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
                    <span>BOOKING</span>
                </h3>
            </div>
        </div>

        <!--back to top-->
        <a href="#showcaseID" class="back-to-top cursor-pointer"></a>

        <!--main section-->
        <main class="booking">
            <div class="book-form">
                <h1 class="text-white open-sans text-center">Booking Form</h1>
                <form class="open-sans grid-wrap">

                <fieldset>
                    <legend class="labels">Title:</legend>
                    <input type="radio" name="title" value="mr">
                    <label for="mr">Mr.</label>
                    <input type="radio" name="title" value="mrs">
                    <label for="mrs">Mrs.</label>
                    <input type="radio" name="title" value="ms">
                    <label for="ms">Ms.</label>
                </fieldset>

                <fieldset>
                    <legend class="labels">Request Date:</legend>
                    <input type="date" name="date" placeholder="Date" class="input focused" id="date">
                    <span id="dateError" class="error">Invalid date</span>
                </fieldset>

                <fieldset>
                    <legend class="labels">Request Time:</legend>
                    <input type="time" name="time" placeholder="Time" class="input focused" id="time">
                    <span id="timeError" class="error">AM or PM?</span>
                </fieldset>

                <fieldset>
                    <legend class="labels">Name:</legend>
                    <input type="text" name="name" placeholder="Enter your Name" class="input focused" id="name">
                    <span id="nameError" class="error">Invalid input</span>
                </fieldset>

                <fieldset>
                    <legend class="labels">Email:</legend>
                    <input type="email" name="email" placeholder="Enter Email" class="input focused" id="email">
                    <span id="emailError" class="error">Invalid email</span>
                </fieldset>

                <fieldset>
                    <legend class="labels">Phone:</legend>
                    <input type="tel" name="phone" placeholder="Enter Phone" class="input focused" id="phone">
                    <span id="phoneError" class="error">Invalid number</span>
                </fieldset>

                <fieldset>
                    <legend class="labels">Service:</legend>
                    <select class="input focused" id="select">
                        <option value="service">Please select a service</option>
                        <option value="waxing">Waxing</option>
                        <option value="manicure">Manicure</option>
                        <option value="pedicure">Pedicure</option>
                        <option value="children">Children</option>
                    </select>
                    <span id="selectError" class="error">You must select a service</span>

                    <span class="labels specific-label" id="waxing-label">Specify type:</span>
                    <select class="waxing input focused specific-input">
                        <option value="eyebrow">Eyebrow</option>
                        <option value="lip">Lip</option>
                        <option value="chin">Chin</option>
                        <option value="sideburns">Sideburns</option>
                        <option value="underarm">Underarm</option>
                        <option value="partial leg">Partial Leg</option>
                        <option value="full leg">Full Leg</option>
                        <option value="partial arm">Partial Arm</option>
                        <option value="full arm">Full Arm</option>
                        <option value="bikini">Bikini</option>
                        <option value="brazilian">Brazilian</option>
                        <option value="fingers">Fingers</option>
                        <option value="toes">Toes</option>
                    </select>

                    <span class="labels specific-label" id="manicure-label">Specify type:</span>
                    <select class="manicure input focused specific-input">
                        <option value="polish change">Polish Change</option>
                        <option value="regular manicure">Regular Manicure</option>
                        <option value="hot oil manicure">Hot Oil Manicure</option>
                        <option value="gel polish change">Gel Polish Change</option>
                        <option value="regular gel manicure">Regular Gel Manicure</option>
                        <option value="organic spa manicure">Organic Spa Manicure</option>
                        <option value="extended wear polish">Extended Wear Polish</option>
                        <option value="design">Design</option>
                        <option value="french/american">French/American</option>
                    </select>

                    <span class="labels specific-label" id="pedicure-label">Specify type:</span>
                    <select class="pedicure input focused specific-input">
                        <option value="polish change">Polish Change</option>
                        <option value="express pedicure">Express Pedicure</option>
                        <option value="regular pedicure">Regular Pedicure</option>
                        <option value="signature spa pedicure">Signature Spa Pedicure</option>
                        <option value="premium spa pedicure">Premium Spa Pedicure</option>
                        <option value="glitter & polish special">Glitter & Polish Special</option>
                        <option value="extended wear polish">Extended Wear Polish</option>
                        <option value="design">Design</option>
                        <option value="french/american">French/American</option>
                        <option value="gel polish add on">Gel Polish Add On</option>
                    </select>

                    <span class="labels specific-label" id="children-label">Specify type:</span>
                    <select class="children input focused specific-input">
                        <option value="polish change fingers/toes">Polish Change Fingers/Toes</option>
                        <option value="regular manicure">Regular Manicure</option>
                        <option value="regular pedicure">Regular Pedicure</option>
                        <option value="extended wear polish">Extended Wear Polish</option>
                        <option value="design">Design</option>
                        <option value="french/american">French/American</option>
                        <option value="gel polish add on">Gel Polish Add On</option>
                    </select>
                </fieldset>

                <fieldset>
                    <legend class="labels">Inquery:</legend>
                    <textarea placeholder="Inquery" class="input focused"></textarea>
                </fieldset>

                <button type="submit" class="btn btn-blue cursor-pointer">BOOK NOW</button>

                </form>
            </div>
        </main>

        <!--book-->
        <div class="section book">
            <div class="book-divider"></div>
            <h1 class="text-white title text-center">Book with us today</h1>
            <div class="tint"></div>
            <a href="#" class="btn btn-black text-center">BOOK NOW</a>
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
        <script src="src/validation.js"></script>
        <script src="src/global.js"></script>
        <script src="src/booking.js"></script>
    </body>
</html>