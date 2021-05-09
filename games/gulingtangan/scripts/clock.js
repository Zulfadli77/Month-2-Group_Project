 // UI vars
const UItime = document.querySelector('.display-clock'); 
const UIdate = document.querySelector('.display-date'); 


window.onload = function() {
    // load function at zero second
    setInterval(displayClock);

}


// display clock
function displayClock() {
    const time = new Date();
    let second = time.getSeconds();
    let minute = time.getMinutes();
    let hour = time.getHours();
    let am_pm = 'AM'

    // condition for AM and PM
    if(hour > 12) {
        hour -= 12;
        am_pm = 'PM'
    }else if(hour == 0) {
        hour = 12;
    }

    // to make the seconds, minutes or hour value less than 10 to double figure i.e 01 02 ..
    second = (second < 10) ? `0${second}`: second;
    minute = (minute < 10) ? `0${minute}`: minute;
    hour = (hour < 10) ? `0${hour}`: hour;

    UItime.innerHTML = `<span>${hour} : </span><span>${minute} : </span><span class="min">${second}</span><span class="max">${am_pm}</span>`
                        
    // call display date function
    displayDate()
}


// display min
function displayDate() {
    const date = new Date()
    let day = date.getUTCDay();
    let dateNum = date.getUTCDate();
    let month  = date.getMonth();
    let year = date.getUTCFullYear();

    switch(day) {
        case day = 0:
            day = "Sunday";
            break;
        case day = 1:
            day = "Monday";
            break;
        case day = 2:
            day = "Tuesday";
            break;
        case day = 3:
            day = "Wednesday";
            break;
        case day = 4:
            day = "Thursday";
            break;
        case day = 5:
            day = "Friday";
            break;
        case day = 6:
            day = "Saturday";
            break;

    };


    switch(month) {
        case month = 0:
            month = "January";
            break;
        case month = 1:
            month = "February";
            break;
        case month = 2:
            month = "March";
            break;
        case month = 3:
            month = "April";
            break;
        case month = 4:
            month = "May";
            break;
        case month = 5:
            month = "June";
            break;
        case month = 6:
            month = "July";
            break;
        case month = 7:
            month = "August";
            break;
        case month = 8:
            month = "September";
            break;
        case month = 9:
            month = "October";
            break;
        case month = 10:
            month = "November";
            break;
        case month = 11:
            month = "December";
            break;

    };
    
    UIdate.innerHTML = `
                        <span>${day},  </span>
                        <span>${dateNum} </span>
                        <span>${month} </span>
                        <span>${year}</span>`
 
}