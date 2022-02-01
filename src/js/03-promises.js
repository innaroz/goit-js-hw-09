import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const delay = Number(document.querySelector("[name='delay']").value);
  const step = Number(document.querySelector("[name='step']").value);
  const amount = Number(document.querySelector("[name='amount']").value);

  return [...new Array(amount)].map((_el, position) => {
    return createPromise(position + 1, position === 0 ? delay : delay + position * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  });
});
