import {isEscEvent} from './utils.js';

//модальное окно при удачной отправке
const successModalTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successWindow = successModalTemplate.cloneNode(true);

successWindow.addEventListener ('click', () => {
  successWindow.remove();
});

successWindow.addEventListener ('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    successWindow.remove();
  }
});

export const openSuccessModal = () => {
  document.body.appendChild(successWindow);
};

//модальное окно при неудачной отправке
const failModalTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const failWindow = failModalTemplate.cloneNode(true);

failWindow.addEventListener ('click', () => {
  failWindow.remove();
});

failWindow.addEventListener ('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    failWindow.remove();
  }
});

export const openFailModal = () => {
  document.body.appendChild(failWindow);
};
