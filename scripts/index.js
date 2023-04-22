import FormValidator from "./FormValidation.js";
import Card from "./Card.js";

const formValidator = new FormValidator(validationConfig);
formValidator.enableValidation();

const card = new Card('#elements', data)


// Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupsOverlay);
  document.addEventListener('keydown', closePopupEsc);

  formValidator.enableValidation();
}
// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('click', closePopupsOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}


// Редактирование профиля
const openPopupEditProfile = function () {
  nameInput.value = getName.textContent;
  jobInput.value = getJob.textContent;
  openPopup(editProfile);
};
// Обработчик клика функции
profileEditButton.addEventListener('click', openPopupEditProfile);


// Отправка формы с изменениями в профиле
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    getName.textContent = `${nameInput.value}`;
    getJob.textContent = `${jobInput.value}`;
    closePopup(popupProfile);
};
// Обработчик отправки функции
profileForm.addEventListener('submit', handleProfileFormSubmit);


// Добавляем готовую карточку в сетку
function createCard (data) {
  const cardElement = card.getCard(data)
  cardsContainer.prepend(cardElement);
};
// Перебераем каждую и ставим в начало списка
initialCards.reverse().forEach(createCard);


// Открытие попапа с картинкой
function openPopupCard (evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupSubtitle.textContent = evt.target.alt;
  openPopup(openCard);
}
// Обработчики событий
function setEventListeners (cardElement) {
  cardElement.querySelector(".elements-block__delete-button").addEventListener('click', handleDelete);
  cardElement.querySelector(".elements-block__like-button").addEventListener('click', toggleLike);
  cardElement.querySelector(".elements-block__image").addEventListener('click', openPopupCard);
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

export { openPopup, closePopup, createCard };