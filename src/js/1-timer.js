import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  dateTimePicker: document.querySelector(`#datetime-picker`),
  startBtn: document.querySelector(`[data-start]`),
  daysElem: document.querySelector(`.value[data-days]`),
  hoursElem: document.querySelector(`.value[data-hours]`),
  minutesElem: document.querySelector(`.value[data-minutes]`),
  secondsElem: document.querySelector(`.value[data-seconds]`),
};

let selectedDate;
let timeInterval;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: `ERROR`,
        message: `Please choose a date in the future`,
        position: `topRight`,
      });
    } else {
      iziToast.success({
        title: `OK`,
        message: `Please enter Start`,
        position: `topRight`,
      });
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.dateTimePicker, options);

refs.startBtn.addEventListener(`click`, () => {
  refs.startBtn.disabled = true;
  refs.dateTimePicker.disabled = true;
  timeInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
  const deffTime = selectedDate - new Date();
  if (deffTime <= 0) {
    refs.dateTimePicker.disabled = false;
    clearInterval(timeInterval);
    updateDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  } else {
    const timesTimer = convertMs(deffTime);
    updateDisplay(timesTimer);
  }
}

function updateDisplay({ days, hours, minutes, seconds }) {
  refs.daysElem.textContent = addLeadingZero(days);
  refs.hoursElem.textContent = addLeadingZero(hours);
  refs.minutesElem.textContent = addLeadingZero(minutes);
  refs.secondsElem.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
