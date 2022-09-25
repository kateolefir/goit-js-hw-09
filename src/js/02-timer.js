import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const inputDate = document.querySelector('#datetime-picker');

startBtn.disabled = true;
let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      
       if (selectedDates[0] < Date.now()) {
      startBtn.disabled = true;

      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      userDate = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.isActive = false;
    this.intervalId = null;
    startBtn.disabled = true;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      startBtn.disabled = true;
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      const components = convertMs(deltaTime);

      days.textContent = components.days;
      hours.textContent = components.hours;
      minutes.textContent = components.minutes;
      seconds.textContent = components.seconds;

      if (deltaTime <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  timer.startTimer();
});

const timer = new Timer();
flatpickr(inputDate, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}