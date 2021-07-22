const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((responce) => responce.json())
    .then((data) => {
      onSuccess(data);
    });
};

const sendData = (onSuccess, onFail, reDraw, body) => {
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then ((responce) => {
      if (responce.ok) {
        onSuccess();
        reDraw();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
