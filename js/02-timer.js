document.addEventListener("DOMContentLoaded", function () {
  const dateTimePicker = document.getElementById("datetime-picker");
  const startButton = document.querySelector("[data-start]");
  const daysElement = document.querySelector("[data-days]");
  const hoursElement = document.querySelector("[data-hours]");
  const minutesElement = document.querySelector("[data-minutes]");
  const secondsElement = document.querySelector("[data-seconds]");

  let countdownInterval;

  const convertMs = function (ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  };

  const addLeadingZero = function (value) {
    return value.toString().padStart(2, "0");
  };

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDate < new Date()) {
        Notiflix.Notify.warning("Please choose a date in the future");
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  };

  flatpickr(dateTimePicker, options);

  startButton.addEventListener("click", function () {
    const selectedDate = new Date(dateTimePicker.value).getTime();
    const currentDate = new Date().getTime();
    let timeDifference = selectedDate - currentDate;

    if (timeDifference <= 0) {
      Notiflix.Notify.warning("Please choose a date in the future");
      return;
    }

    startButton.disabled = true;

    countdownInterval = setInterval(function () {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);

      timeDifference -= 1000;

      if (timeDifference < 0) {
        clearInterval(countdownInterval);
        Notiflix.Notify.success("Countdown completed!");
        startButton.disabled = false;
      }
    }, 1000);
  });
});
