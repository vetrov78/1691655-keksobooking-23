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
