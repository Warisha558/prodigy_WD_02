let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopButton.innerHTML = 'Stop';
    } else {
        clearInterval(tInterval);
        running = false;
        startStopButton.innerHTML = 'Start';
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    startStopButton.innerHTML = 'Start';
    laps = [];
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.innerText = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = hours + ':' + minutes + ':' + seconds;
}

startStopButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
