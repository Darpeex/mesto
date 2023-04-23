// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupsOverlay);
  document.addEventListener('keydown', closePopupEsc);
}

// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('click', closePopupsOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}

// Общий обработчик для кнопок закрытия (крестиков)
const closeButtons = document.querySelectorAll('.popup__button_action_close'); // находим все крестики проекта по универсальному селектору.
  closeButtons.forEach((button) => { // С окончанием `s`, так как кнопок много
  const popup = button.closest('.popup'); // находим 1 раз ближайший к крестику попап
  button.addEventListener('click', () => closePopup(popup)); // устанавливаем обработчик закрытия на крестик
});

// Закрытие попапа кликом на оверлей
function closePopupsOverlay() {
  const closeModal = Array.from(document.querySelectorAll('.popup'));
  closeModal.forEach(popup => {
    popup.addEventListener('mousedown', function(evt) { // mousedown, а не click, т.к. когда пользователь выделяет поле мышкой, чтобы стереть содержимое и курсор выходит за пределы конктейнера попапа, попап закрывается, а таким образом мы закрываем по оверлею только целенаправленно
      if(evt.target === evt.currentTarget) {
        popup.classList.remove('popup_opened');
      }
    });
  });
}

// Закрытие попапа нажатием на Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpend = document.querySelector('.popup_opened');
    closePopup(popupOpend);
  }
};

export { openPopup, closePopup };