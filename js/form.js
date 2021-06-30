const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

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
adForm.action = 'https://23.javascript.pages.academy/keksobooking';
adForm.method = 'post';
adForm.enctype = 'multipart/form-data';
setFormDisabled(adForm, 'ad-form--disabled');

const mapFiltersForm  = document.querySelector('.map__filters');
setFormDisabled(mapFiltersForm, 'ad-form--disabled');

setFormEnabled(adForm, 'ad-form--disabled');

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${ MIN_NAME_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${ MAX_NAME_LENGTH - valueLength} символов`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

const roomsGuestsRelation = {
  '1':'1',
  '2':['1', '2'],
  '3':['1', '2', '3'],
  '100': '0',
};

const roomNumberInput = document.querySelector('#room_number');
const apartmentCapacityInput = document.querySelector('#capacity');

const isProperRelation = function (){
  return roomsGuestsRelation[roomNumberInput.value].includes(apartmentCapacityInput.value);
};
//соответствие числа гостей количеству комнат
apartmentCapacityInput.addEventListener('change', () => {
  if (!isProperRelation()) {apartmentCapacityInput.setCustomValidity('Недопустимое число гостей');}
  else {apartmentCapacityInput.setCustomValidity('');}
  apartmentCapacityInput.reportValidity();
});
//соответствие числа комнат количеству гостей
roomNumberInput.addEventListener('change', ()=>{
  if (!isProperRelation()) {roomNumberInput.setCustomValidity('Несоответствие: комнаты-гости!!');}
  else {roomNumberInput.setCustomValidity('');}
  roomNumberInput.reportValidity();
});
