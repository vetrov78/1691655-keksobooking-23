import {adForm, mapFiltersForm} from './form.js';
import {setFormEnabled} from './utils.js';
import {drawMarkers} from './markers.js';

const TOKYO_LATITUDE = 35.65858;
const TOKYO_LONGITUDE = 139.74549;

const map = L.map('map-canvas')
  .on('load', ()=> {
    setFormEnabled(adForm);
    adForm.querySelector('#address').value = `${TOKYO_LATITUDE}, ${TOKYO_LONGITUDE}`;
    adForm.querySelector('#address').readOnly = true;
    setFormEnabled(mapFiltersForm);
  })
  .setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [38, 38],
  iconAnchor: [19, 0],
});

const mainMarker = L.marker(
  {
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  },
  {
    icon: mainIcon,
    draggable: true,
  },
);
mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const coordinateStr = `${Number(evt.target.getLatLng().lat.toFixed(5))}, ${Number(evt.target.getLatLng().lng.toFixed(5))}`;
  adForm.querySelector('#address').value = coordinateStr;
});

drawMarkers(map);
