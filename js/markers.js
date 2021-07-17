import { isFilterProperAd } from './form.js';
import { map } from './map.js';
const SHOWED_ADS_NUMBER = 10;

const HOUSE_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

//создание содержимого балуна
const adTemplateFragment = document.querySelector('#card').content;
const adTemplate = adTemplateFragment.querySelector('.popup');
const createCustomPopup = (ad) => {
  const newAdItem = adTemplate.cloneNode(true);

  newAdItem.querySelector('.popup__title').textContent = ad.offer.title;
  newAdItem.querySelector('.popup__text--address').textContent = ad.offer.address;
  newAdItem.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  newAdItem.querySelector('.popup__type').textContent = HOUSE_TYPE[ad.offer.type];
  newAdItem.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  newAdItem.querySelector('.popup__text--time').textContent = `${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  //добавим удобства, в списке шаблона удалим несуществующие в объявлении
  //modifiers - список названий классов имеющихся удобств в данном объявлении
  const featuresListElement = newAdItem.querySelector('.popup__features');
  const modifiers = ad.offer.features ? ad.offer.features.map((feature) => `popup__feature--${feature}`) : [];
  featuresListElement.querySelectorAll('.popup__feature')
    .forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  newAdItem.querySelector('.popup__description').textContent = ad.offer.description ? ad.offer.description : null;
  if (ad.offer.photos) {
    const imgTemplate = newAdItem.querySelector('.popup__photo');
    const photosList = document.createDocumentFragment();
    ad.offer.photos.forEach((source) => {
      const newImage = imgTemplate.cloneNode(true);
      newImage.src = source;
      photosList.appendChild(newImage);
    });
    newAdItem.querySelector('.popup__photos').children[0].remove();
    newAdItem.querySelector('.popup__photos').appendChild(photosList);
  } else {
    newAdItem.querySelector('.popup__photo').classList.add('hidden');
  }
  newAdItem.querySelector('.popup__avatar').src = ad.author.avatar;

  return newAdItem;
};
//создание маркера
const createMarker = (ad) => {
  const currentIcon = L.icon ({
    iconUrl: '../img/pin.svg',
    iconSize: [38, 38],
    iconAnchor: [19, 0],
  });
  const currentMarker = L.marker ({
    lat: ad.location.lat,
    lng: ad.location.lng,
  },
  {
    icon: currentIcon,
  });
  currentMarker
    .addTo(map)
    .bindPopup(createCustomPopup(ad));
};
//рисование маркеров из массива
export const drawMarkers = (data) => {
  data
    .slice()
    .filter(isFilterProperAd)
    .slice(0, SHOWED_ADS_NUMBER)
    .forEach((ad) => {createMarker(ad);});
};

