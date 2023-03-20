// Делаем выборку DOM элементов
const popupProfile = document.querySelector('#editProfile');
const popupAddCard = document.querySelector('#addCard');
const popupAddCardButton = document.querySelector('.profile__button_action_add');
const popupEditButton = document.querySelector('.profile__button_action_edit');
const popupCloseButtonProfile = popupProfile.querySelector('.popup__button_action_close');
const popupCloseButtonCards = popupAddCard.querySelector('.popup__button_action_close');
const popupSaveButton = popupProfile.querySelector('.popup__button_action_save');
const getName = document.querySelector ('.profile__name');
const getJob = document.querySelector('.profile__activity');
const formElement = document.querySelector('.popup__form');
// console.log(popupProfile);
// console.log(popupAddCard);
// Находим поля формы
let nameInput = formElement.querySelector('.popup__form-input_field_name');
let jobInput = formElement.querySelector('.popup__form-input_field_activity');

// Открыть попап редактирования
const openPopupEditProfile = function () {
  popupProfile.classList.add('popup_opened');
  nameInput.value = getName.textContent;
  jobInput.value = getJob.textContent;
};
// Закрыть попап
const closePopupEditProfile = function () {
  popupProfile.classList.remove('popup_opened');
};
// Отправляем форму с изменениями в профиле
function handleFormSubmit (evt) {
    evt.preventDefault();
    getName.textContent = `${nameInput.value}`;
    getJob.textContent = `${jobInput.value}`;
    closePopupEditProfile ();
};
popupEditButton.addEventListener('click', openPopupEditProfile);
popupCloseButtonProfile.addEventListener('click', closePopupEditProfile);
formElement.addEventListener('submit', handleFormSubmit);



// Открыть попап добавления карточки
const openPopupAddCard = function () {
  popupAddCard.classList.add('popup_opened');
};
// Закрыть попап
const closePopupAddCard = function () {
  popupAddCard.classList.remove('popup_opened');
};

popupAddCardButton.addEventListener('click', openPopupAddCard);
popupCloseButtonCards.addEventListener('click', closePopupAddCard);
