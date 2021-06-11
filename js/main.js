const ADS_NUMBER = 10;
const AVATAR_NUMBERS = Array.from({length: ADS_NUMBER}, (v,k)=>`0${k+1}`.slice(-2));
const COORDINATE_ACCURACY = 5;
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const PRICE_INTERVAL = {MIN: 1, MAX: 10e+7};
const FLAT_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const ROOM_QUANTITY = {MIN: 1, MAX: 10};
const GUEST_QUANTITY = {MIN: 1, MAX: 15};
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//случайное положительное целое из диапазона
function getRandomInt (startRange, finishRange) {
  if (startRange < 0 || finishRange < 0) {
    throw new Error('Значения границ диапазона не должны быть отрицательными');
  }
  else if (startRange > finishRange) {
    throw new Error('Начальная граница диапазона не должна быть больше конечной');
  }
  else if (startRange === finishRange) {
    return startRange;
  }
  return Math.floor(Math.random() * (finishRange + 1 - startRange)) + startRange;
}

function getRandomNumber (startRange, finishRange, accuracy) {
  if (startRange < 0 || finishRange < 0 || accuracy < 0) {
    throw new Error('Значения параметров не должны быть отрицательными');
  }
  else if (startRange >= finishRange) {
    throw new Error('Начальная граница диапазона не должна быть больше или равна конечной');
  }
  return parseFloat((Math.random() * (finishRange - startRange) + startRange).toFixed(accuracy));
}

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomArrayFromArray = (elements) => {
  const resultArray = [...elements];
  const resultLength = getRandomInt(1, elements.length);
  for (let i = 0; i < elements.length - resultLength; i++) {
    resultArray.splice(getRandomInt(0, resultArray.length - 1), 1);
  }
  return resultArray;
};

const getRandomAvatarNumber = () => AVATAR_NUMBERS.splice(getRandomInt(0, AVATAR_NUMBERS.length - 1), 1);

const createNewAd = () => {
  const lat = getRandomNumber(LATITUDE_MIN, LATITUDE_MAX, COORDINATE_ACCURACY);
  const lng = getRandomNumber(LONGITUDE_MIN, LONGITUDE_MAX, COORDINATE_ACCURACY);
  return {
    // author, объект — описывает автора. Содержит одно поле:
    // avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются.
    author: {
      avatar: `img/avatars/user${getRandomAvatarNumber()}.png`,
    },
    // location, объект — местоположение в виде географических координат. Состоит из двух полей:
    // lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
    // lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
    location: {lat, lng},
    // offer, объект — содержит информацию об объявлении. Состоит из полей:
    // title, строка — заголовок предложения. Придумайте самостоятельно.
    // address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.
    // price, число — стоимость. Случайное целое положительное число.
    // type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
    // rooms, число — количество комнат. Случайное целое положительное число.
    // guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
    // checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    // checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    // features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
    // description, строка — описание помещения. Придумайте самостоятельно.
    // photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
    offer: {
      title: 'Заголовок предложения',
      address: `${lat}, ${lng}`,
      price: getRandomInt(PRICE_INTERVAL.MIN, PRICE_INTERVAL.MAX),
      type: getRandomArrayElement(FLAT_TYPES),
      rooms: getRandomInt(ROOM_QUANTITY.MIN, ROOM_QUANTITY.MAX),
      guests: getRandomInt(GUEST_QUANTITY.MIN, GUEST_QUANTITY.MAX),
      checkin: getRandomArrayElement(CHECK_TIMES),
      checkout: getRandomArrayElement(CHECK_TIMES),
      features: getRandomArrayFromArray(FEATURES),
      description: 'Описание помещения',
      photos: getRandomArrayFromArray(PHOTOS),
    },
  };
};

const randomAds = new Array(ADS_NUMBER).fill().map(createNewAd);

randomAds.values;
