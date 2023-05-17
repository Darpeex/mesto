import './index.css'; // добавьте импорт главного файла стилей
import {
  validationConfig,
  profileForm,
  creationForm,
  initialCards,
  cardsContainer,
  cardTemplate,
  popupProfile,
  popupAddCard,
  popupAddCardBtn,
  nameCard,
  srcImg,
  data,
  profileEditButton,
  nameInput,
  jobInput,
} from "../utils/constants.js"
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const profileFormValidator = new FormValidator(validationConfig, profileForm) // Экземляр для формы профиля
const creationFormValidator = new FormValidator(validationConfig, creationForm) // Экземпляр для формы добавления кнопки

profileFormValidator.enableValidation();
creationFormValidator.enableValidation();

// Класс PopupWithImage - открытие карточек
// const popupWithImage = new PopupWithImage();

// Класс Section, отвечающий за отрисовку карточек на странице
const cardList = new Section({ renderer: (item) => {
  cardList.addItem(createCard(item))
}}, "#elements")
cardList.renderItems(initialCards);

// Открыть попап добавления карточки
popupAddCardBtn.addEventListener('click', () => {
  addCardPopup.open()
});

// Добавление новой карточки
const addCardPopup = new PopupWithForm('#addCard', renderCard);
  addCardPopup.setEventListeners();

function renderCard(dataForm) {
  if (nameCard.value.length <= 1 || srcImg.value.length <= 1) {stop;}
  else {
    data.name = dataForm.cardName;
    data.link = dataForm.cardLink;
    createCard(data);

    creationFormValidator.resetPopupForm();
  }
}

// Добавляем готовую карточку в сетку
function createCard (data) {
  const card = new Card('#elements', data, cardTemplate, () => {
    // popupWithImage.open({ name: data.name, link: data.link })
  })
  
  const cardElement = card.getCard(data)
  // cardList.addItem(cardElement); Эта штука работает но её надо вынести в renderCard
  cardsContainer.prepend(cardElement);
  return(cardElement);
};

const popupEditProfile = new PopupWithForm('#editProfile', handleProfileFormSubmit);
  popupEditProfile.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__activity');

// Редактирование профиля
const openPopupEditProfile = function () {
  const profileData = userInfo.getUserInfo()
  nameInput.value = profileData.userName;
  jobInput.value = profileData.userDescription;
  popupEditProfile.open();
};
// Обработчик клика функции
profileEditButton.addEventListener('click', openPopupEditProfile);

// Отправка формы с изменениями в профиле
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo({userName: data.userName, userDescription: data.userAbout});
  popupEditProfile.close();
};


// Работать добавление карточки
// Работать открытие картинки
// Перенести вставку карточки