//случайное положительное целое из диапазона [start, finish]
function getRandomInt (startRange, finishRange) {
  if (startRange < 0 || finishRange < 0) {
    throw new Error('Значения границ диапазона не должны быть отрицательными');
  }
  else if (startRange > finishRange) {
    throw new Error('Начальная граница диапазона должна быть больше или равна конечной');
  }
  else if (startRange === finishRange) {
    return 0;
  }
  return Math.floor(Math.random() * (finishRange + 1 - startRange)) + startRange;
}

function getRandomNumber (startRange, finishRange, accuracy) {
  if (startRange < 0 || finishRange < 0 || accuracy < 0) {
    throw new Error('Значения параметров не должны быть отрицательными');
  }
  else if (startRange > finishRange) {
    throw new Error('Начальная граница диапазона должна быть больше или равна конечной');
  }
  else if (startRange === finishRange) {
    return 0;
  }
  return parseFloat((Math.random() * (finishRange - startRange) + startRange).toFixed(accuracy));
}

getRandomInt(0, 5);
getRandomNumber(5.5123, 13.3, 4);
