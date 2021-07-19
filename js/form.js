import { sendData } from './api.js';
import {setFormDisabled} from './utils.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const LOW_PRICE_LIMIT = 10000;
const MIDDLE_PRICE_LIMIT = 50000;

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
//блокировка формы фильтрации и формы ввода нового объявления
export const adForm  = document.querySelector('.ad-form');
setFormDisabled(adForm);
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
// const availabilityWiFi = mapFiltersForm.querySelector('#filter-wifi');
// const availabilityDishWasher = mapFiltersForm.querySelector('#filter-dishwasher');
// const availabilityParking = mapFiltersForm.querySelector('#filter-parking');
// const availabilityWasher = mapFiltersForm.querySelector('#filter-washer');
// const availabilityElevator = mapFiltersForm.querySelector('#filter-elevator');
// const availabilityConditioner = mapFiltersForm.querySelector('#filter-conditioner');

export const setFilterChange = (cb) => {
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
  // availabilityWiFi.addEventListener('change', () => {
  //   filterValues.wifi = availabilityWiFi.checked;
  //   cb();
  // });
  // availabilityDishWasher.addEventListener('change', () => {
  //   filterValues.dishwasher = availabilityDishWasher.checked;
  //   cb();
  // });
  // availabilityParking.addEventListener('change', () => {
  //   filterValues.parking = availabilityParking.checked;
  //   cb();
  // });
  // availabilityWasher.addEventListener('change', () => {
  //   filterValues.washer = availabilityWasher.checked;
  //   cb();
  // });
  // availabilityElevator.addEventListener('change', () => {
  //   filterValues.elevator = availabilityElevator.checked;
  //   cb();
  // });
  // availabilityConditioner.addEventListener('change', () => {
  //   filterValues.conditioner = availabilityConditioner.checked;
  //   cb();
  // });
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
  const isOptionIncluded = (option) => {
    if (element.offer.features !== undefined) {
      return filterValues[option] ? element.offer.features.includes(option) : true;
    } else {
      return false;
    }
  };
  const checkApartType = filterValues.type === 'any' ? true : element.offer.type === filterValues.type;
  const checkPrice = filterValues.price === 'any' ? true : isPriceInRange(element.offer.price, filterValues.price);
  // eslint-disable-next-line eqeqeq
  const checkRooms = filterValues.rooms === 'any' ? true : element.offer.rooms == filterValues.rooms;
  // eslint-disable-next-line eqeqeq
  const checkGuests = filterValues.guests === 'any' ? true : element.offer.guests == filterValues.guests;
  const checkOptions = checkApartType && checkPrice && checkRooms && checkGuests;

  const checkAdditionalFeatures = true;
  for (const k in additionalFeatures) {
    console.log(k);
    // if (additionalFeatures[k]) {
    //   checkAdditionalFeatures = checkAdditionalFeatures && element.offer.features.includes(k);
    // }
  }
  // const checkWiFi = isOptionIncluded('wifi');
  // const checkDishWasher = isOptionIncluded('dishwasher');
  // const checkParking = isOptionIncluded('parking');
  // const checkWasher = isOptionIncluded('washer');
  // const checkElevator = isOptionIncluded('elevator');
  // const checkConditioner = isOptionIncluded('conditioner');
  // const checkAdditionalFeatures = checkWiFi && checkDishWasher && checkParking && checkWasher && checkElevator && checkConditioner;

  return checkOptions && checkAdditionalFeatures;
};

// отправка данных на сервер
export const setFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};
