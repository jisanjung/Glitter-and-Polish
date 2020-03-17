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

        <!--COVID-19 warning-->
        <aside class="open-sans">
            <div>
                <p>
                    Due to the Coronavirus (COVID-19), we are temporarily closed as instructed by local township officials. We apologize for the inconvenience.
                </p>
                <p>If an appointment is critical, please call: </br><a href="tel:267-699-8413">267-699-8413</a></p>
            </div>
        </aside>

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
                    <span><a href="index">HOME</a></span>
                    <span>\</span>
                    <span>BOOKING</span>
                </h3>
            </div>
        </div>

        <!--back to top-->
        <a href="#showcaseID" class="back-to-top cursor-pointer"></a>

        <!--main section-->
        <main class="booking">

            <span class="submit-message"></span>

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
                        <option value="Service">Please select a service</option>
                        <option value="Waxing">Waxing</option>
                        <option value="Manicure">Manicure</option>
                        <option value="Pedicure">Pedicure</option>
                        <option value="Children">Children</option>
                    </select>
                    <span id="selectError" class="error">You must select a service</span>
                </fieldset>

                <fieldset>
                    <legend class="labels">Inquery:</legend>
                    <textarea placeholder="Inquery" class="input focused" id="inquery"></textarea>
                </fieldset>

                <button type="submit" class="btn btn-blue cursor-pointer" id="bookBtn">BOOK NOW</button>

                </form>
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
        <script src="src/validation.js"></script>
        <script src="src/global.js"></script>
        <script src="src/booking.js"></script>
    </body>
</html>