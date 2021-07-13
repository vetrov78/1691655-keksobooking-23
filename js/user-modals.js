import {isEscEvent} from './utils.js';

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
