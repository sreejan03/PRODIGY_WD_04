let startTime, updatedTime, difference, tInterval, running = false, paused = false, laps = [];
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateDisplay, 1);
        running = true;
        paused = false;
        startButton.innerText = 'Resume';
        pauseButton.innerText = 'Pause';
    }
}

function pause() {
    if (running && !paused) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        paused = true;
        startButton.innerText = 'Resume';
        pauseButton.innerText = 'Paused';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    startTime = null;
    difference = 0;
    display.innerText = '00:00:00';
    startButton.innerText = 'Start';
    pauseButton.innerText = 'Pause';
    laps = [];
    lapsContainer.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = display.innerText;
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.innerText = lapTime;
        lapsContainer.appendChild(lapItem);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.innerText = timeToString(updatedTime);
}

function timeToString(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return ${minutes}:${seconds}:${milliseconds};
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);