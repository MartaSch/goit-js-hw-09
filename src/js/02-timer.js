import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
//import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputData = document.querySelector('input[type="text"]');
const startBtn = document.querySelector('button[data-start]');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');

const currentDateNow = new Date();
let futureDate = null;
let timerId = null;

  const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
          let futureDate = selectedDates[0].getTime();
 startBtn.disabled = true;
        if(selectedDates[0] < currentDateNow) {
    Notiflix.Notify.failure("Please choose a date in the future");
        } else {
          startBtn.disabled = false;
        }
    return futureDate;
      },
    };
    flatpickr(inputData, options);

    function addleadingZero(value) { 
      String(value).padStart(2, '0');
    }

    startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
      let currentDate = new Date().getTime();  
      const distance = futureDate - currentDate; 
    if (distance > 0) {
  const { days, hours, minutes, seconds } = convertMs(distance);
  daysData.textContent = addleadingZero(days);
  hoursData.textContent = addleadingZero(hours);
  minutesData.textContent = addleadingZero(minutes);
  secondsData.textContent = addleadingZero(seconds);
    } 
    else 
    clearInterval();
     
  }, 1000);
  });

   
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




 
