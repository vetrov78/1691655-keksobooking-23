import './form.js';
import './map.js';

import { drawMarkers } from './markers.js';
import { setFormSubmit } from './form.js';
import {openSuccessModal} from './user-modals.js';

const SHOWED_ADS_NUMBER = 9;
//получение и отрисовка объявлений с сервера
fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((responce) => responce.json())
  .then((data) => {
    drawMarkers(data.slice(0, SHOWED_ADS_NUMBER));
  });

setFormSubmit(openSuccessModal);

