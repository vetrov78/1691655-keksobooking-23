//случайное положительное целое из диапазона [start, finish]
function getRandomInt (startRange, finishRange) {
  if (startRange < 0 || finishRange < 0) {
    throw new Error('Значения границ диапазона не должны быть отрицательными');
  }
  else if (startRange >= finishRange) {
    throw new Error('Начальная граница диапазона не должна быть больше или равна конечной');
  }
  return Math.floor(Math.random() * (finishRange + 1 - startRange)) + startRange;
}

function getRandomNumber (startRange, finishRange, accuracy) {
  if (startRange < 0 || finishRange < 0 || accuracy < 0) {
    throw new Error('Значения параметров не должны быть отрицательными');
  }
  else if (startRange >= finishRange) {
    throw new Error('Начальная граница диапазона не должна быть больше или равна конечной');
  }
  return parseFloat((Math.random() * (finishRange - startRange) + startRange).toFixed(accuracy));
}

getRandomInt(0, 5);
getRandomNumber(5.5123, 13.3, 4);
