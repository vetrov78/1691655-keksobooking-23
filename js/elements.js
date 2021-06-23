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
  newAdItem.querySelector('.popup__type').textContent = HOUSE_TYPE[ad.offer.type];
  newAdItem.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  newAdItem.querySelector('.popup__text--time').textContent = `${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  //добавим удобства, в списке шаблона удалим несуществующие в объявлении
  const featuresListElement = newAdItem.querySelector('.popup__features');
  //список названий классов имеющихся удобств в данном объявлении
  const modifiers = ad.offer.features.map((feature) => `popup__feature--${feature}`);
  //сравнение по элементам списка шаблона
  featuresListElement.querySelectorAll('.popup__feature')
    .forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });

  newAdItem.querySelector('.popup__description').textContent = ad.offer.description ? ad.offer.description : null;

  const imgTemplate = newAdItem.querySelector('.popup__photo');
  const photosList = document.createDocumentFragment();
  ad.offer.photos.forEach((source) => {
    const newImage = imgTemplate.cloneNode(true);
    newImage.src = source;
    photosList.appendChild(newImage);
  });
  newAdItem.querySelector('.popup__photos').children[0].remove();
  newAdItem.querySelector('.popup__photos').appendChild(photosList);

  // eslint-disable-next-line no-console
  console.log(newAdItem);

  newAdItem.classList.add('visually-hidden');
  adsList.appendChild(newAdItem);
});

//отрисуем первый из созданных DOM элементов
adsList.children[0].classList.remove('visually-hidden');
adsPlace.appendChild(adsList);
