import { sendData } from './api.js';
import {setFormDisabled} from './utils.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const LOW_PRICE_LIMIT = 10000;
const MIDDLE_PRICE_LIMIT = 50000;
export const TOKYO_COORDINATES = {
  lat: 35.65858,
  lng: 139.74549,
};

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
//данные полей фильтра
const filterValues = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
};
const additionalFeatures = {
  wifi: false,
  dishwasher: false,
  parking: false,
  washer: false,
  conditioner: false,
};
export const defaultFilterValues = () => {
  Object.keys(filterValues).forEach((k) => filterValues[k] = 'any');
};
export const defaultAdditionalFeatures = () => {
  Object.keys(additionalFeatures).forEach((k) => additionalFeatures[k] = false);
};
//блокировка формы фильтрации и формы ввода нового объявления
export const adForm  = document.querySelector('.ad-form');
setFormDisabled(adForm);
adForm.querySelector('#address').value = `${TOKYO_COORDINATES.lat}, ${TOKYO_COORDINATES.lng}`;
export const mapFiltersForm  = document.querySelector('.map__filters');
setFormDisabled(mapFiltersForm);
// валидация поля заголовка
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
//валидация соответствия числа гостей количеству комнат
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
//валидация соответствия числа комнат количеству гостей
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
//Выпадающиt списки
const apartmentTypeSelect = mapFiltersForm.querySelector('#housing-type');
const apartmentPriceSelect = mapFiltersForm.querySelector('#housing-price');
const apartmentRoomsSelect = mapFiltersForm.querySelector('#housing-rooms');
const apartmentGuestsSelect = mapFiltersForm.querySelector('#housing-guests');
//Чекбоксы
const nodesAdditionalFeatures = mapFiltersForm.querySelectorAll('.map__checkbox');

export const setFilterChange = (cb) => {
  //обновление списка чекбоксов дополнительных опций
  const updateFeaturesArray = () => {
    nodesAdditionalFeatures.forEach((feature) => {
      additionalFeatures[feature.value] = feature.checked;
    });
  };
  //выпадающие списки
  apartmentTypeSelect.addEventListener('change', () => {
    filterValues.type = apartmentTypeSelect.value;
    cb();
  });
  apartmentPriceSelect.addEventListener('change', () => {
    filterValues.price = apartmentPriceSelect.value;
    cb();
  });
  apartmentRoomsSelect.addEventListener('change', () => {
    filterValues.rooms = apartmentRoomsSelect.value;
    cb();
  });
  apartmentGuestsSelect.addEventListener('change', () => {
    filterValues.guests = apartmentGuestsSelect.value;
    cb();
  });
  //чекбоксы
  nodesAdditionalFeatures.forEach((feature) => {
    feature.addEventListener('change', () => {
      updateFeaturesArray();
      cb();
    });
  });
};
//проверка соответствия объявления фильтрам
export const isFilterProperAd = function(element) {
  const isPriceInRange = (adPrice, filterPriceType) => {
    if (filterPriceType === 'low') {
      return adPrice < LOW_PRICE_LIMIT;
    } else if (filterPriceType === 'middle') {
      return adPrice >= LOW_PRICE_LIMIT && adPrice < MIDDLE_PRICE_LIMIT;
    } else {
      return adPrice >= MIDDLE_PRICE_LIMIT;
    }
  };
  const checkApartType = filterValues.type === 'any' ? true : element.offer.type === filterValues.type;
  const checkPrice = filterValues.price === 'any' ? true : isPriceInRange(element.offer.price, filterValues.price);
  const checkRooms = filterValues.rooms === 'any' ? true : element.offer.rooms.toString() === filterValues.rooms;
  const checkGuests = filterValues.guests === 'any' ? true : element.offer.guests.toString() === filterValues.guests;
  const checkOptions = checkApartType && checkPrice && checkRooms && checkGuests;

  let checkAdditionalFeatures = true;
  for (const [k, v] of Object.entries(additionalFeatures)) {
    if (v) {
      if (element.offer.features !== undefined) {
        checkAdditionalFeatures = checkAdditionalFeatures && element.offer.features.includes(k);
      } else {checkAdditionalFeatures = false;}
    }
  }
  return checkOptions && checkAdditionalFeatures;
};
// отправка данных на сервер
export const setFormSubmit = (onSuccess, onFail, reDraw) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      () => reDraw(),
      new FormData(evt.target),
    );
  });
};

export const setFortmReset = (cb) => {
  adForm.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
    evt.preventDefault();
    adForm.reset();
    mapFiltersForm.reset();
    defaultAdditionalFeatures();
    defaultFilterValues();
    cb();
  });
};
