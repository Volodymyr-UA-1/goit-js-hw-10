//Підключаємо бібліотеки
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;//змінна для зберігання обраної дати
let timerId = null;

const dateInput = document.querySelector('#datetime-picker');
const btnstart = document.querySelector('[data-start]');

// налаштовуємо календар
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // функція що викликаєтьсяпісля закриття календаря
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  //беремо перший елемент масиву (дату)
    const selected = selectedDates[0];
  // перевіряємо дату
  const currentDate = new Date();
    if (!selected || selected < currentDate) {
      // якщо обрана минула дата, то error- спливаюче вікно
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
      //дезактивуємо кнопку, щоб не можна було запустити таймер,
      // поки не оберемо іншу дату 
      btnstart.disabled = true;
      return;
    }
    // якщо дата відповідає вимогам, тобто майьутня, то 
    // записуємо обрану дату в змінну що створили раніше
    userSelectedDate = selected;
    //активуємо кнопку для запуску таймера
    btnstart.disabled = false;
  },
};

// викликаємо функцію
flatpickr('#datetime-picker', options);

// налаштовуємо таймер
btnstart.addEventListener('click', () => {//якщо натиснули кнопку
  if (!userSelectedDate) return;//вийти якщо немає нічого

  btnstart.disabled = true;//дезактивуємо кнопку
  dateInput.disabled = true;//дезактивуємо поле input

  timerId = setInterval(() => {// запускаємо таймер->
    const currentTime = new Date();//зберігаємо нову дату
    const diff = userSelectedDate - currentTime;//виводимо різницю

    if (diff <= 0) {//коли все по нулям 
      clearInterval(timerId);//зупиня 
      dateInput.disabled = false;//активуємо поле
      btnstart.disabled = true;//дезактивуємо кнопку, щоб не було повтора
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });//все по нулям
      return;
    }

    const time = convertMs(diff);//передаємо мс у ф-ю convertMs(ms)
    updateTimer(time);//записуємо нові дані
  }, 1000);//->кожну секунду, рядок 59
});

// знаходимо в html aтрибути, зберігаємо у змінні, 
//щоб передати їм дані і вмвести інф-ю на екран
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

//вставляємо нуль перед  нашим часом у кожну змінну
function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

// конвертація мс у сек, хв, год, дн.
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