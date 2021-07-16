const ALERT_SHOW_TIME = 5000;

//случайное положительное целое из диапазона
export function getRandomInt (startRange, finishRange) {
  if (startRange < 0 || finishRange < 0) {
    throw new Error('Значения границ диапазона не должны быть отрицательными');
  }
  else if (startRange > finishRange) {
    throw new Error('Начальная граница диапазона не должна быть больше конечной');
  }
  else if (startRange === finishRange) {
    return startRange;
  }
  return Math.floor(Math.random() * (finishRange + 1 - startRange)) + startRange;
}

//случайное с плавающей точкой из заданного диапазона положительных чисел, с заданной точностью
export function getRandomNumber (startRange, finishRange, accuracy) {
  if (startRange < 0 || finishRange < 0 || accuracy < 0) {
    throw new Error('Значения параметров не должны быть отрицательными');
  }
  else if (startRange >= finishRange) {
    throw new Error('Начальная граница диапазона не должна быть больше или равна конечной');
  }
  return parseFloat((Math.random() * (finishRange - startRange) + startRange).toFixed(accuracy));
}

//случайный элемент массива
export const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

//массив случайной длины из заданного массива, в результ.массиве элементы не повторяются
export const getRandomArrayFromArray = (elements) => {
  const resultArray = [...elements];
  const resultLength = getRandomInt(1, elements.length);
  for (let i = 0; i < elements.length - resultLength; i++) {
    resultArray.splice(getRandomInt(0, resultArray.length - 1), 1);
  }
  return resultArray;
};

//переводит форму в неактивное состояние - добавляет класс formName, всем дочерним элементам - св-во disabled
export function setFormDisabled (formName, disableClassName='ad-form--disabled') {
  formName.classList.add(disableClassName);
  [...formName.children].forEach((element) => {element.disabled = true;});
}
//переводит форму в активное состояние
export function setFormEnabled (formName, disableClassName='ad-form--disabled') {
  formName.classList.remove(disableClassName);
  [...formName.children].forEach((element) => {element.disabled = false;});
}
// ######### Без return возвращала Undefined ###########
export const isEscEvent = (evt) => {
  return (evt.key === 'Escape' || evt.key === 'Esc');
};

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
