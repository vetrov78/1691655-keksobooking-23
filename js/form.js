//неактивное состояние - добавляет форме класс formName, всем дочерним элементам - св-во disabled
function setFormDisabled (formName, disableClassName) {
  formName.classList.add(disableClassName);
  [...formName.children].forEach((element) => {element.disabled = true;});
}

function setFormEnabled (formName, disableClassName) {
  formName.classList.remove(disableClassName);
  [...formName.children].forEach((element) => {element.disabled = false;});
}

const adForm  = document.querySelector('.ad-form');
setFormDisabled(adForm, 'ad-form--disabled');

const mapFiltersForm  = document.querySelector('.map__filters');
setFormDisabled(mapFiltersForm, 'ad-form--disabled');

setFormEnabled(adForm, 'ad-form--disabled');

// function changeFormAccess (formName, disableClassName) {
//   if (formName.classList.contains(disableClassName)) {
//     formName.classList.remove(disableClassName);
//     [...formName.children].forEach((element) => {element.disabled = false;});
//   }
//   else {
//     formName.classList.add(disableClassName);
//     [...formName.children].forEach((element) => {element.disabled = true;});
//   }
// }

// const promoBlock = document.querySelector('.promo');
// promoBlock.style.flexDirection = 'column';
// promoBlock.style.alignItems = 'center';

// const buttonElement = document.createElement('button');
// buttonElement.innerHTML = 'Enable';
// promoBlock.appendChild(buttonElement);

// buttonElement.addEventListener('click', () => {changeFormAccess(mapFiltersForm, 'ad-form--disabled');});
