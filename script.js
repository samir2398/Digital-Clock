const clockE1 = document.getElementById("clock");
const dateE1 = document.getElementById("date");
const toggleFormatBtn = document.getElementById("toggleFormatBtn");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const alarmTime = document.getElementById("alarmTime");
const setAlarmBtn = document.getElementById("setAlarmBtn");
const alarmStatus = document.getElementById("alarmStatus");
const alarmSound = document.getElementById("alarmSound");


let is24HourFormat = true;
let alarmTimeInput = null;
let alarmTimeout = null;

function updateClock(){

    const now = new Date();


    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let amPm = "";

      

    if(!is24HourFormat){

        amPm = hours >= 12 ? "PM":"AM";
        hours = hours % 12 || 12;           //convert 0  to  12   for 12-hour format
    }

    const formattedTime = 
    `${String(hours).padStart(2,"0")}:`+
    `${String(minutes).padStart(2, "0")}:`+
    `${String(seconds).padStart(2, "0")}`
    amPm;


    clockE1.textContent = formattedTime;



    //Date display

    const options = {weekday: "long", month: 'long', day: "numeric", year: "numeric"};
    dateE1.textContent = now.toLocaleDateString(undefined, options);


    // Check alarm

    if (alarmTime) {

        const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        if (currentTime === alarmTime) {

            alarmSound.play();
            alarmStatus.textContent = "Alarm ringing!";
            clearTimeout(alarmTimeout);
            // Stop alarm after 1 min
            alarmTimeout = setTimeout(()=>{

                alarmSound.onpause();
                alarmSound.currentTime = "";
            }, 60000);
            alarmTime = null; // Reset alarm
        }
    }

}


toggleFormatBtn.addEventListener("click", ()=>{

    is24HourFormat = !is24HourFormat;
    toggleFormatBtn.textContent = is24HourFormat ? "Switch to 12-hour" : "Switch to 24-hour";
    updateClock();
});


toggleThemeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");
});

setAlarmBtn.addEventListener("click", () => {

    alarmTime = alarmTimeInput.value;
    if (!alarmTime) {

        alarmStatus.textContent = `Please set a valid time.`;
        return;
    }

    alarmStatus.textContent = `Alarm set for  ${alarmTime}`;
});


// Start the clock and update every second
updateClock();
setInterval(updateClock, 1000);