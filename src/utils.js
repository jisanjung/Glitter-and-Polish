function formatTimeTo12Hour(timeString) {
    const [hours, minutes] = timeString.split(':');
    let suffix = 'AM';
    let formattedHours = parseInt(hours, 10);

    if (formattedHours >= 12) {
        suffix = 'PM';
        if (formattedHours > 12) {
            formattedHours -= 12;
        }
    }

    return `${formattedHours}:${minutes} ${suffix}`;
}

function formatDate(inputDate) {
    // Split the inputDate to get year, month, and day
    const [year, month, day] = inputDate.split('-');

    // Array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to get the ordinal suffix for the day
    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

    // Format the date in 'MMM Dth, YYYY' format
    const formattedDate = `${monthNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}${getOrdinalSuffix(parseInt(day, 10))}, ${year}`;

    return formattedDate;
}

function getCurrentDateTime() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const daysSuffix = ['th', 'st', 'nd', 'rd'];

    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    let daySuffix;
    if (day >= 11 && day <= 13) {
        daySuffix = 'th';
    } else {
        daySuffix = daysSuffix[day % 10] || 'th';
    }

    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedDateTime = `${month} ${day}${daySuffix}, ${year} at ${formattedHours}:${formattedMinutes} ${amOrPm}`;

    return formattedDateTime;
}

function isEmailValid(email) {
    // Regular expression for basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function currentDate() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.setSeconds();
    
    return output;
}
