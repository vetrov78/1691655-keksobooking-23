import {isEscEvent} from './utils.js';
import { adForm } from './form.js';

export const openSuccessModal = () => {
  const successModalTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successWindow = successModalTemplate.cloneNode(true);
  document.body.appendChild(successWindow);
  adForm.reset();

  document.addEventListener ('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successWindow.remove();
    }
  });

  successWindow.addEventListener ('click', () => {
    successWindow.remove();
  });
};

export const openFailModal = () => {
  const failModalTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  const failWindow = failModalTemplate.cloneNode(true);
  document.body.appendChild(failWindow);

  document.addEventListener ('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      failWindow.remove();
    }
  });

  failWindow.addEventListener ('click', () => {
    failWindow.remove();
  });
};
