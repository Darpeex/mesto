import { openPopup, closePopup } from "./utils/utils.js";
import FormValidator from "./scripts/FormValidation.js";
import Card from "./scripts/Card.js";

const profileFormValidator = new FormValidator(validationConfig, profileForm) // Экземляр для формы профиля
const creationFormValidator = new FormValidator(validationConfig, creationForm) // Экземпляр для формы добавления кнопки

profileFormValidator.enableValidation();
creationFormValidator.enableValidation();

// Открыть попап добавления карточки
const openPopupAddCard = function() {
  openPopup(popupAddCard);
};
popupAddCardBtn.addEventListener('click', openPopupAddCard);

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
  const card = new Card('#elements', data, cardTemplate)
  
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