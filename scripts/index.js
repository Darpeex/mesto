import { openPopup, closePopup } from "../utils/utils.js";
import FormValidator from "./FormValidation.js";
import Card from "./Card.js";

const formValidator = new FormValidator(validationConfig);
formValidator.enableValidation();

const card = new Card('#elements', data, cardTemplate)


// Добавление новой карточки
const renderCard = (evt) => {
  if (getCardName.value.length <= 1 || getSrcImg.value.length <= 1) {stop;}
  else {
    evt.preventDefault();
    data.name = getCardName.value;
    data.link = getSrcImg.value;
    createCard(data);
    creationForm.reset();
    closePopup(popupAddCard);}
}
creationForm.addEventListener('submit', renderCard);

// Добавляем готовую карточку в сетку
function createCard (data) {
  const cardElement = card.getCard(data)
  cardsContainer.prepend(cardElement);
};
// Перебераем каждую и ставим в начало списка
initialCards.reverse().forEach(createCard);


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
