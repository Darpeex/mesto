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


// Открыть попап добавления карточки
const openPopupAddCard = function () {
  openPopup(popupAddCard);
};
// Обработчик клика функции
popupAddCardBtn.addEventListener('click', openPopupAddCard);


// Создаём и возвращаем карточку из массива
function getCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".elements-block__image");
  cardElement.querySelector(".elements-block__name").textContent = data.name;
  cardImage.src = data.link; 
  cardImage.alt = data.name;
  setEventListeners(cardElement);
  return cardElement
}
// Добавляем готовую карточку в сетку
function createCard (data) {
  const cardElement = getCard(data)
  cardsContainer.prepend(cardElement);
};
// Перебераем каждую и ставим в начало списка
initialCards.reverse().forEach(createCard);


// Добавление новой карточки
const renderCard = (evt) => {
  if (getCardName.value.length <= 1 || getSrcImg.value.length <= 1) {stop;}
  else {
    evt.preventDefault();
    const data = {name: '.elements-block__name', link: '.elements-block__image'};
    data.name = getCardName.value;
    data.link = getSrcImg.value;
    createCard(data);
    creationForm.reset();
    closePopup(popupAddCard);}
}
creationForm.addEventListener('submit', renderCard)


// Лайк карточки
function toggleLike (evt) {
    evt.target.classList.toggle('elements-block__like-button_active');
};
// Удаление карточки
function handleDelete (evt) {
  const card = evt.target.closest('.elements-block');
  card.remove();
}


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
    popup.addEventListener('click', function(evt) {
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