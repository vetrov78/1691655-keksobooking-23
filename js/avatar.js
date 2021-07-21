const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
//загрузка аватарки
const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
avatarFileChooser.accept='image/png, image/jpeg';
const avatarPrewiev = document.querySelector('.ad-form-header__preview img');

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((el) => fileName.endsWith(el));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPrewiev.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
//загрузка фото объекта
const propertyImageChooser = document.querySelector('.ad-form__upload input[type=file]');
propertyImageChooser.accept='image/png, image/jpeg';
const propertyPrewiev = document.querySelector('.ad-form__photo');
//создаем img
const imgTag = document.createElement('img');
imgTag.style.maxWidth = '100%';
imgTag.style.maxHeight = '100%';
propertyPrewiev.appendChild(imgTag);

propertyImageChooser.addEventListener('change', () => {
  const file = propertyImageChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((el) => fileName.endsWith(el));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      propertyPrewiev.querySelector('img').src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
