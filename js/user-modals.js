import {isEscEvent} from './utils.js';
import { adForm, mapFiltersForm } from './form.js';
import { setMainMarkerToInitial } from './map.js';

export const openSuccessModal = () => {
  const successModalTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successWindow = successModalTemplate.cloneNode(true);
  document.body.appendChild(successWindow);
  adForm.reset();
  mapFiltersForm.reset();
  setMainMarkerToInitial();

  const onEscRemoveModal = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successWindow.remove();
      document.removeEventListener('keydown', onEscRemoveModal);
    }
  };
  document.addEventListener ('keydown', onEscRemoveModal);
  successWindow.addEventListener ('click', () => {
    successWindow.remove();
    document.removeEventListener('keydown', onEscRemoveModal);
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
