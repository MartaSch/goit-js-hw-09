import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputData = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('button[data-start]');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');
const currentDateNow = new Date();
let timerId = null;
let futureDate = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      startBtn.disabled = true;
        futureDate = selectedDates[0].getTime();

        if (selectedDates[0] <= currentDateNow) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
          startBtn.disabled = false;
        }
        return futureDate;
    },
};

flatpickr(inputData, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

startBtn.addEventListener("click", () => { 
timerId = setInterval(() => {
        let currentDate = new Date().getTime();
        const timerMs = futureDate - currentDate;
        if (timerMs > 0) {  
            const { days, hours, minutes, seconds } = convertMs(timerMs);
            daysData.textContent = addLeadingZero(days);
            hoursData.textContent = addLeadingZero(hours);
            minutesData.textContent = addLeadingZero(minutes);
            secondsData.textContent = addLeadingZero(seconds);
        } 
        else clearInterval();
    }, 1000);
});


function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  // Remaining 
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}




 
