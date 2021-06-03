//случайное положительное целое из диапазона [start, finish]
function getRandomInt (startRange, finishRange) {
  if ((startRange < 0) || (finishRange < 0)) {
    return 'Значения границ диапазона должны быть больше нуля';
  }
  else if (startRange >= finishRange) {
    return 'Начальная граница диапазона должна быть строго больше конечной';
  }
  return Math.floor(Math.random() * (finishRange - startRange)) + startRange;
}

function getRanfomFloat (startRange, finishRange, accuracy) {
  if ((startRange < 0) || (finishRange < 0)) {
    return 'Значения границ диапазона должны быть больше нуля';
  }
  else if (startRange >= finishRange) {
    return 'Начальная граница диапазона должна быть строго больше конечной';
  }
  return (Math.random() * (finishRange - startRange) + startRange).toFixed(accuracy);
}

const randomInt = getRandomInt(5, 15);
const randomFloat = getRanfomFloat(5.5123, 13.3, 4);


// eslint-disable-next-line no-console
console.log(randomInt);
// eslint-disable-next-line no-console
console.log(randomFloat);
