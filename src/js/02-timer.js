import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const addLeadingZero = (value) => {
  return `${value}`.padStart(2, '0');
};

const convertMs = (ms) => {
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

  return { days: addLeadingZero(days), hours: addLeadingZero(hours), minutes: addLeadingZero(minutes), seconds: addLeadingZero(seconds) };
}

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = Date.parse(selectedDates[0]);
    const currentDate = new Date().getTime();
    if (currentDate > selectedDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
    // console.log();
  },
};

flatpickr('#datetime-picker', options);

const updateDate = (date) => {
  document.querySelector('[data-days]').innerText = date.days;
  document.querySelector('[data-hours]').innerText = date.hours;
  document.querySelector('[data-minutes]').innerText = date.minutes;
  document.querySelector('[data-seconds]').innerText = date.seconds;
};

let interval = null;

startBtn.addEventListener('click', () => {
  updateDate(convertMs(selectedDate - new Date().getTime()));
  interval = setInterval(() => {
    const leftTime = convertMs(selectedDate - new Date().getTime());
    updateDate(convertMs(selectedDate - new Date().getTime()));
    if (Object.values(leftTime).every((val) => Number(val) === 0)) {
      clearInterval(interval);
    }
  }, 1000);
});
