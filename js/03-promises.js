document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstDelay = parseInt(form.elements["delay"].value);
    const delayStep = parseInt(form.elements["step"].value);
    const amount = parseInt(form.elements["amount"].value);

    if (isNaN(firstDelay) || isNaN(delayStep) || isNaN(amount)) {
      window.alert("Please enter valid numbers in all fields");
      return;
    }

    createPromises(amount, firstDelay, delayStep);
  });

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    });
  }

  function createPromises(amount, firstDelay, delayStep) {
    for (let i = 1; i <= amount; i++) {
      const delay = firstDelay + (i - 1) * delayStep;

      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }
});
