import './form.js';
import './map.js';
import { drawMarkers } from './markers.js';
import { setApartChange, setFormSubmit } from './form.js';
import {openSuccessModal, openFailModal} from './user-modals.js';
import { getData } from './api.js';

//получение и отрисовка объявлений с сервера
getData((ads) => {
  drawMarkers(ads);
  setApartChange(() => drawMarkers(ads));
});

setFormSubmit(openSuccessModal, openFailModal);

