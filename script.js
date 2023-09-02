

$('.stopwatch-btn').click(function() {
    // hide everything except the stopwatch
    $('.outer-wrapper > div').slideUp();
    //show stopwatch wrapper
    $('.stopwatch').slideDown();

    // update type text
    $('.type').html("STOPWATCH");
});

$('.back-btn').click(function() {
    // hide everything except the clock
    $('.outer-wrapper > div').slideUp();
    //show clock wrapper
    $('.clock').slideDown();

    // update type text
    $('.type').find("STOPWATCH").text("CLOCK");
    $('.type').html("CLOCK");
});

$('.timer-btn').click(function() {
    // hide everything except the timer
    $('.outer-wrapper > div').slideUp();
    //show timer wrapper
    $('.timer').slideDown();

    // update type text
    $('.type').html("TIMER");
})

$('.alarm-btn').click(function() {
    // hide everything except the timer
    $('.outer-wrapper > div').slideUp();
    //show timer wrapper
    $('.alarm').slideDown();

    // update type text
    $('.type').html("ALARM CLOCK");
})

const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
};

const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";

    // 24 hours -> 12 hours
    hours = hours % 12 || 12;

    // add zeroes before number if < 10
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $('#hour').html(hours);
    $('#min').html(minutes);
    $('#sec').html(seconds);
    $('#ampm').html(ampm);
    $('#other-ampm').html(otherampm);
};

updateTime();

setInterval(updateTime , 1000);

// Stopwatch

let stopwatchHours = 0,
 stopwatchMinutes = 0,
 stopwatchSeconds = 0,
 stopwatchMiliseconds = 0,
 stopwatchRunning = false,
 laps = 0,
 stopwatchInterval;

const stopwatch = () => {
    //increase milisecond by one
    stopwatchMiliseconds ++;

    if (stopwatchMiliseconds === 100) {
        //then increase one second and then set ms to 0
        stopwatchSeconds ++;
        stopwatchMiliseconds = 0;
    }

    if (stopwatchSeconds === 60) {
        stopwatchMinutes ++;
        stopwatchSeconds = 0;
    }

    if (stopwatchMinutes === 60) {
        stopwatchHours ++;
        stopwatchMinutes = 0;
    }

    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $('#stopwatch-min').html(addTrailingZero(stopwatchMinutes));
    $('#stopwatch-sec').html(addTrailingZero(stopwatchSeconds));
    $('#stopwatch-ms').html(addTrailingZero(stopwatchMiliseconds));
};

const startStopwatch = () => {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(stopwatch , 10);
        stopwatchRunning = true;
    }
};

const stopStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
};

// reset stopwatch
const resetStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliseconds = 0;
    stopwatchRunning = false;;
    laps = 0;

    $('#stopwatch-hour').html("00");
    $('stopwatch-min').html("00");
    $('#stopwatch-sec').html("00");
    $('#stopwatch-ms').html("00");
    $('.laps').html("");
}

$('.start-stopwatch').click (function() {
    startStopwatch();

    $('.start-stopwatch').hide();
    $('.lap-stopwatch').show();
});

$('.reset-stopwatch').click (function() {
    resetStopwatch();

    $('.start-stopwatch').show();
    $('.lap-stopwatch').hide();
});

$('.lap-stopwatch').click (function() {
    laps ++;
    //remove active class
    $('.lap').removeClass("active");
    $('.laps').prepend(
        `<div class="lap active">
            <p>lap ${laps}</p>
            <p>
                ${addTrailingZero(stopwatchHours)} : ${(addTrailingZero(stopwatchMinutes))} : ${(addTrailingZero(stopwatchSeconds))} : ${(addTrailingZero(stopwatchMiliseconds))}
            </p>
        </div>`
    );
});


// Timer

let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerInterval;

const getTime = () => {
    time = prompt ("Enter time in minutes");

    //converting time to seconds
    time = time * 60;

    setTime();
    alert ("Click on Start again to start the timer")
};

const setTime = () => {
    timerHours = Math.floor(time/3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);

    $('#timer-hour').html(addTrailingZero(timerHours));
    $('#timer-min').html(addTrailingZero(timerMinutes));
    $('#timer-sec').html(addTrailingZero(timerSeconds));
    $('#timer-ms').html(addTrailingZero(timerMiliseconds));
};

const timer = () =>{
    timerMiliseconds--;
    if (timerMiliseconds === -1) {
        timerMiliseconds = 99;
        timerSeconds--;
    }
    if (timerSeconds === -1) {
        timerSeconds = 59;
        timerMinutes--;
    }
    if (timerMinutes === -1) {
        timerMinutes = 59;
        timerHours--;
    }

    // upadte time
    $('#timer-hour').html(addTrailingZero(timerHours));
    $('#timer-min').html(addTrailingZero(timerMinutes));
    $('#timer-sec').html(addTrailingZero(timerSeconds));
    $('#timer-ms').html(addTrailingZero(timerMiliseconds));

    // check time up in every interval
    timeUp();
};

const startTimer = () =>{
    if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMiliseconds === 0) {
        getTime();
    }

    else {
        timerInterval = setInterval(timer , 10);
        $('.start-timer').hide();
        $('.stop-timer').show();
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    $('.start-timer').show();
    $('.stop-timer').hide();
};

const resetTimer = () => {
    stopTimer();
    time = 0;
    setTime();
};

// check if time remaining 
const timeUp = () => {
    if ((timerHours === 0) && (timerMinutes === 0) && (timerSeconds === 0) && (timerMiliseconds === 0)) {

        resetTimer();
        alert("Time is up !!")
    }
}
$(".start-timer").click(function() {
    startTimer();
});

$(".stop-timer").click(function() {
    stopTimer();
});

$('.reset-timer').click(function() {
    resetTimer();

});


//  ALARM CLOCK

const currentTime = document.querySelector('h1');
const selectMenu = document.querySelectorAll('select');
const setAlarmBtn = document.getElementById('set');
const chooseTime = document.querySelector('.choose-time');

let alarmTime , isAlarmSet = false;
let ringtone = new Audio("ringtone.mp3");

for (let i = 12 ; i > 0 ; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59 ; i >= 0 ; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2 ; i > 0 ; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h == 0 ? h = 12 : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime == `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        chooseTime.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }


    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    
    if (time.includes("Hour") || time.includes("Minute") || time.includes("am/pm")) {
        return alert("Please, select a valid time to set Alarm !");
    }

    isAlarmSet = true;
    alarmTime = time;
    chooseTime.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";

}

setAlarmBtn.addEventListener('click', setAlarm);