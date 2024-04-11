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
    const date = new Date(inputDate);
    
    // Define months array
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get month, day and year
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Add "st", "nd", "rd" or "th" to the day
    let daySuffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        daySuffix = 'st';
    } else if (day === 2 || day === 22) {
        daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
        daySuffix = 'rd';
    }
    
    // Format the date
    const formattedDate = `${month} ${day}${daySuffix}, ${year}`;
    
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