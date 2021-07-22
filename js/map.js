import {adForm, mapFiltersForm, TOKYO_COORDINATES} from './form.js';
import {setFormEnabled} from './utils.js';

export const map = L.map('map-canvas')
  .on('load', ()=> {
    adForm.querySelector('#address').readOnly = true;
    setFormEnabled(adForm);
    setFormEnabled(mapFiltersForm);
  })
  .setView({
    lat: TOKYO_COORDINATES.lat,
    lng: TOKYO_COORDINATES.lng,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
//создаем слой для главного маркера, цель - разместить его поверх остальных
map.createPane('mainMarker');
map.getPane('mainMarker').style.zIndex = 999;
//добавление основного маркера на карту
const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [38, 38],
  iconAnchor: [19, 0],
});
const mainMarker = L.marker(
  {
    lat: TOKYO_COORDINATES.lat,
    lng: TOKYO_COORDINATES.lng,
  },
  {
    icon: mainIcon,
    draggable: true,
    pane: 'mainMarker',
  },
);

mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const coordinateStr = `${Number(evt.target.getLatLng().lat.toFixed(5))}, ${Number(evt.target.getLatLng().lng.toFixed(5))}`;
  adForm.querySelector('#address').value = coordinateStr;
});

export const setMainMarkerToInitial = () => {
  mainMarker.setLatLng([TOKYO_COORDINATES.lat, TOKYO_COORDINATES.lng]);
  adForm.querySelector('#address').value = `${TOKYO_COORDINATES.lat}, ${TOKYO_COORDINATES.lng}`;
};

adForm.addEventListener('reset', (evt) => {

  setMainMarkerToInitial();
});
