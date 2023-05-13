// import './pages/index.css'; // добавьте импорт главного файла стилей
import FormValidator from "./components/FormValidation.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

const profileFormValidator = new FormValidator(validationConfig, profileForm) // Экземляр для формы профиля
const creationFormValidator = new FormValidator(validationConfig, creationForm) // Экземпляр для формы добавления кнопки

creationFormValidator.enableValidation();

// Класс PopupWithImage - открытие карточек
const popupWithImage = new PopupWithImage();

// Класс Card - получаем данные карточки и открываем попап картинок
// const card = new Card(cardsContainer, data, cardTemplate, () => {popupWithImage.open()})
// card.getCard();

// Класс Section, отвечающий за отрисовку карточек на странице
const cardList = new Section({ items: initialCards, renderer: (item) => {
  cardList.addItem(createCard(item))
}}, cardsContainer)
cardList.renderItems();

// Класс Popup - открытие и закрытие попапа
const editCardPopup = new Popup(popupProfile);
const addCardPopup = new Popup(popupAddCard);

editCardPopup.setEventListeners();
addCardPopup.setEventListeners();

// Открыть попап добавления карточки
popupAddCardBtn.addEventListener('click', () => {
  addCardPopup.open()
});

// Добавление новой карточки
const renderCard = (evt) => {
  if (getCardName.value.length <= 1 || getSrcImg.value.length <= 1) {stop;}
  else {
    evt.preventDefault();
    data.name = getCardName.value;
    data.link = getSrcImg.value;
    createCard(data);
    creationForm.reset();
    addCardPopup.close();}
}
creationForm.addEventListener('submit', renderCard);

// Добавляем готовую карточку в сетку
function createCard (data) {
  const card = new Card('#elements', data, cardTemplate, () => {
    popupWithImage.open({ name: data.name, link: data.link })
  })
  
  const cardElement = card.getCard(data)
  cardsContainer.prepend(cardElement);
  return(cardElement);
};


// Редактирование профиля
const openPopupEditProfile = function () {
  nameInput.value = getName.textContent;
  jobInput.value = getJob.textContent;
  editCardPopup.open();

  profileFormValidator.enableValidation();
};
// Обработчик клика функции
profileEditButton.addEventListener('click', openPopupEditProfile);


// Отправка формы с изменениями в профиле
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    getName.textContent = `${nameInput.value}`;
    getJob.textContent = `${jobInput.value}`;
    editCardPopup.close();
};
// Обработчик отправки функции
profileForm.addEventListener('submit', handleProfileFormSubmit);