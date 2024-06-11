import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector(`.form`);

formElem.addEventListener(`submit`, e => {
  e.preventDefault();

  const delay = parseInt(formElem.elements.delay.value);
  const radioState = formElem.elements.state.value;

  const promise = new Promise((resolve, rejecte) => {
    setTimeout(() => {
      if (radioState === `fulfilled`) {
        resolve(delay);
      } else {
        rejecte(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: `topRight`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: `topRight`,
      });
    });
  formElem.reset();
});
