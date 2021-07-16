import './form.js';
import './map.js';
import { drawMarkers } from './markers.js';
import { setFormSubmit } from './form.js';
import {openSuccessModal, openFailModal} from './user-modals.js';
import { getData } from './api.js';
import {filterApartType} from './form.js';

//получение и отрисовка объявлений с сервера
getData((ads) => {
  drawMarkers(ads);
  filterApartType(() => drawMarkers(ads));
});

setFormSubmit(openSuccessModal, openFailModal);

