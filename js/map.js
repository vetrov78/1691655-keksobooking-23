const map = L.map('map-canvas')
  .on('load', ()=> {
    console.log('map was initialized');
  })
  .setView({
    lat: 35.658581,
    lng: 139.745438,
  }, 9);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
