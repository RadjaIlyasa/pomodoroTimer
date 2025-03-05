// Definisi durasi untuk setiap mode
const POMODORO_TIME = 25 * 60;    // 25 menit
const SHORT_BREAK_TIME = 5 * 60;  // 5 menit
const LONG_BREAK_TIME = 15 * 60;  // 15 menit

// Referensi elemen HTML
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const pomodoroBtn = document.getElementById('pomodoroBtn');
const breakBtn = document.getElementById('breakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');

let timeLeft = POMODORO_TIME;
let timerId = null;
let isPaused = true;
let currentMode = 'pomodoro';

// Fungsi untuk memformat waktu
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Fungsi untuk memulai timer
function startTimer() {
    if (isPaused) {
        isPaused = false;
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerDisplay.textContent = formatTime(timeLeft);
            } else {
                clearInterval(timerId);
                alert('Waktu habis!');
                resetTimer();
            }
        }, 1000);
    }
}

// Fungsi untuk menjeda timer
function pauseTimer() {
    clearInterval(timerId);
    isPaused = true;
}

// Fungsi untuk mereset timer
function resetTimer() {
    clearInterval(timerId);
    isPaused = true;
    
    switch(currentMode) {
        case 'pomodoro':
            timeLeft = POMODORO_TIME;
            break;
        case 'break':
            timeLeft = SHORT_BREAK_TIME;
            break;
        case 'longBreak':
            timeLeft = LONG_BREAK_TIME;
            break;
    }
    
    timerDisplay.textContent = formatTime(timeLeft);
}

// Fungsi untuk mengubah mode
function changeMode(mode, duration) {
    clearInterval(timerId);
    currentMode = mode;
    timeLeft = duration;
    timerDisplay.textContent = formatTime(timeLeft);
    isPaused = true;

    // Update active button style
    [pomodoroBtn, breakBtn, longBreakBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (mode === 'pomodoro') pomodoroBtn.classList.add('active');
    if (mode === 'break') breakBtn.classList.add('active');
    if (mode === 'longBreak') longBreakBtn.classList.add('active');
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

pomodoroBtn.addEventListener('click', () => changeMode('pomodoro', POMODORO_TIME));
breakBtn.addEventListener('click', () => changeMode('break', SHORT_BREAK_TIME));
longBreakBtn.addEventListener('click', () => changeMode('longBreak', LONG_BREAK_TIME));

// Set default mode
pomodoroBtn.classList.add('active');