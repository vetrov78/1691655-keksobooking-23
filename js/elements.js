import {randomAds} from './data.js';
const HOUSE_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

//область страницы для отрисовки объявлений
const adsPlace = document.querySelector('#map-canvas');

//шаблон объявления
const adTemplateFragment = document.querySelector('#card').content;
const adTemplate = adTemplateFragment.querySelector('.popup');

//контейнер для списка объявлений
const adsList = document.createDocumentFragment();


//каждое объявление из списка добавляем в контейнер, согласно условию
randomAds.forEach((ad) => {
  const newAdItem = adTemplate.cloneNode(true);

  newAdItem.querySelector('.popup__title').textContent = ad.offer.title;
  newAdItem.querySelector('.popup__text--address').textContent = ad.offer.address;
  newAdItem.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  newAdItem.querySelector('.popup__type').textContent = HOUSE_TYPE.keys;

  // eslint-disable-next-line no-console
  console.log(newAdItem.textContent);

  newAdItem.classList.add('visually-hidden');
  adsList.appendChild(newAdItem);
});

//отрисуем первый из созданных DOM элементов
adsList.children[0].classList.remove('visually-hidden');
adsPlace.appendChild(adsList);
