import './form.js';
import './map.js';
import { drawMarkers } from './markers.js';
import { setFilterChange, setFormSubmit } from './form.js';
import {openSuccessModal, openFailModal} from './user-modals.js';
import { getData } from './api.js';
import { debounce } from './utils/debounce.js';
import './avatar.js';

const TIMEOUT_DELAY = 500;
//получение и отрисовка объявлений с сервера
getData((ads) => {
  drawMarkers(ads);
  setFilterChange(debounce(() => drawMarkers(ads), TIMEOUT_DELAY));
  setFormSubmit(openSuccessModal, openFailModal, () => drawMarkers(ads) );
});
