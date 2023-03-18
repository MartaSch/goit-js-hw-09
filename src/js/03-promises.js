const form = document.querySelector(".form");
const firstDelay = document.querySelector('[name = "delay"]');
const delayStep = document.querySelector('[name = "step"]');
const amountElement = document.querySelector('[name = "amount"]');

function createPromise(position, delay){
  const promise = new Promise((resolve, reject) => {
setTimeout(() => {
  const shouldResolve = Math.random() > 0.3;
  if(shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
}, delay);
  });
  return promise;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fDelay = Number(firstDelay.value);
  const step = Number(delayStep.value);
  const amount = Number(amountElement.value);
let delay = fDelay;
for (let position = 1; position <= amount; position += 1){
  delay += step;
  createPromise(position, delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}
});
