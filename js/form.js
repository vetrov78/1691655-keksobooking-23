import {setFormDisabled} from './utils.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const relationRoomsGuests = {
  '1':'1',
  '2':['1', '2'],
  '3':['1', '2', '3'],
  '100': '0',
};
const relationTypeMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

export const adForm  = document.querySelector('.ad-form');
adForm.action = 'https://23.javascript.pages.academy/keksobooking';
adForm.method = 'post';
adForm.enctype = 'multipart/form-data';
setFormDisabled(adForm);

export const mapFiltersForm  = document.querySelector('.map__filters');
setFormDisabled(mapFiltersForm);

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

const roomNumberInput = document.querySelector('#room_number');
const apartmentCapacityInput = document.querySelector('#capacity');
const apartmentTypeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');

const isProperRelation = function (){
  return relationRoomsGuests[roomNumberInput.value].includes(apartmentCapacityInput.value);
};

//соответствие числа гостей количеству комнат
apartmentCapacityInput.addEventListener('change', () => {
  if (!isProperRelation()) {
    apartmentCapacityInput.setCustomValidity('Недопустимое число гостей');
  }
  else {
    apartmentCapacityInput.setCustomValidity('');
    roomNumberInput.setCustomValidity('');
  }
  apartmentCapacityInput.reportValidity();
});

//соответствие числа комнат количеству гостей
roomNumberInput.addEventListener('change', () => {
  if (!isProperRelation()) {
    roomNumberInput.setCustomValidity('Несоответствие: комнаты-гости!');
  }
  else {
    roomNumberInput.setCustomValidity('');
    apartmentCapacityInput.setCustomValidity('');
  }
  roomNumberInput.reportValidity();
});

//добавляем атрибуты в поле ввода цены
priceInput.min = relationTypeMinPrice[apartmentTypeInput.value];
priceInput.placeholder = relationTypeMinPrice[apartmentTypeInput.value];
const isProperPrice = function () {
  if (parseInt(priceInput.value, 10) < parseInt(priceInput.min, 10)) {
    priceInput.setCustomValidity(`Цена должна быть ${priceInput.min} и выше`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
};

//при изменении типа жилья изменяется и минимальная цена
apartmentTypeInput.addEventListener('change', () => {
  priceInput.min = relationTypeMinPrice[apartmentTypeInput.value];
  priceInput.placeholder = relationTypeMinPrice[apartmentTypeInput.value];
  isProperPrice();
});

//валидация цены за ночь
priceInput.addEventListener('change', () => {
  isProperPrice();
});

//синхронизация времени заезда-выезда
timeInInput.addEventListener('change', () => {
  timeOutInput.value = timeInInput.value;
});
timeOutInput.addEventListener('change', () => {
  timeInInput.value = timeOutInput.value;
});
