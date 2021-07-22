const ALERT_SHOW_TIME = 5000;

//переводит форму в неактивное состояние - добавляет класс formName, всем дочерним элементам - св-во disabled
export function setFormDisabled (formName, disableClassName='ad-form--disabled') {
  formName.classList.add(disableClassName);
  [...formName.children].forEach((element) => {element.disabled = true;});
}
//переводит форму в активное состояние
export function setFormEnabled (formName, disableClassName='ad-form--disabled') {
  formName.classList.remove(disableClassName);
  [...formName.children].forEach((element) => {element.disabled = false;});
}

export const isEscEvent = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
