import Notiflix from 'notiflix';

const form = document.querySelector(".form");
const firstDelay = document.querySelector('[name = "delay"]');
const delayStep = document.querySelector('[name = "step"]');
const amountElement = document.querySelector('[name = "amount"]');

function createPromise(position, delay){
  return new Promise((resolve, reject) => {
setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if(shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
}, delay);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let fDelay = Number(firstDelay.value);
  const step = Number(delayStep.value);
  const amount = Number(amountElement.value);
for (let position = 1; position <= amount; position += 1){
 
  createPromise(position, fDelay)
  
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  fDelay += step;
}
});
