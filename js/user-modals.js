import {isEscEvent} from './utils.js';
import { adForm } from './form.js';
import { setMainMarkerToInitial } from './map.js';

export const openSuccessModal = () => {
  const successModalTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successWindow = successModalTemplate.cloneNode(true);
  document.body.appendChild(successWindow);
  adForm.reset();
  setMainMarkerToInitial();

  const removeModalOnEsc = function (evt){
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successWindow.remove();
      document.removeEventListener('keydown', removeModalOnEsc);
    }
  };
  document.addEventListener ('keydown', removeModalOnEsc);

  successWindow.addEventListener ('click', () => {
    successWindow.remove();
    document.removeEventListener('keydown', removeModalOnEsc);
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
