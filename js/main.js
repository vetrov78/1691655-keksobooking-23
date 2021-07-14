import './form.js';
import './map.js';

import { drawMarkers } from './markers.js';
import { setFormSubmit } from './form.js';
import {openSuccessModal, openFailModal} from './user-modals.js';
import { getData } from './api.js';

const SHOWED_ADS_NUMBER = 9;
//получение и отрисовка объявлений с сервера
getData((ads) => {
  drawMarkers(ads.slice(0, SHOWED_ADS_NUMBER));
});

setFormSubmit(openSuccessModal, openFailModal);

