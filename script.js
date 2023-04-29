// Get DOM elements
const workInput = document.getElementById('work-input');
const breakInput = document.getElementById('break-input');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer-display');

// Set default values
let workTime = 25 * 60; // 25 minutes
let breakTime = 5 * 60; // 5 minutes
let isWorkInterval = true; // Start with a work interval
let isPaused = true;
let intervalId;

// Convert time in seconds to minutes and seconds format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update timer display
function updateDisplay(time) {
  timerDisplay.textContent = formatTime(time);
}

// Start timer
function startTimer() {
  isPaused = false;
  intervalId = setInterval(() => {
    if (isWorkInterval) {
      workTime--;
      updateDisplay(workTime);
      if (workTime === 0) {
        isWorkInterval = false;
        workTime = workInput.value * 60;
        timerDisplay.classList.remove('work-interval');
        timerDisplay.classList.add('break-interval');
      }
    } else {
      breakTime--;
      updateDisplay(breakTime);
      if (breakTime === 0) {
        isWorkInterval = true;
        breakTime = breakInput.value * 60;
        timerDisplay.classList.remove('break-interval');
        timerDisplay.classList.add('work-interval');
      }
    }
  }, 1000);
}

// Pause timer
function pauseTimer() {
  isPaused = true;
  clearInterval(intervalId);
}

// Reset timer
function resetTimer() {
  isWorkInterval = true;
  workTime = workInput.value * 60;
  breakTime = breakInput.value * 60;
  isPaused = true;
  clearInterval(intervalId);
  updateDisplay(workTime);
  timerDisplay.classList.remove('break-interval');
  timerDisplay.classList.add('work-interval');
}

// Add event listeners to buttons
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize timer display
updateDisplay(workTime);
timerDisplay.classList.add('work-interval');
