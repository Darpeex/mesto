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
  cardName,
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
const popupWithImage = new PopupWithImage();

// Класс Section, отвечающий за отрисовку карточек на странице
const cardList = new Section({ renderer: (item) => {
  cardList.addItem(createCard(item))
}}, "#elements")
cardList.renderItems(initialCards);

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
  if (cardName.value.length <= 1 || srcImg.value.length <= 1) {stop;}
  else {
    evt.preventDefault();
    data.name = cardName.value;
    data.link = srcImg.value;
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

const popupEditProfile = new PopupWithForm(popupProfile, handleProfileFormSubmit);
  popupEditProfile.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__activity');

// Редактирование профиля
const openPopupEditProfile = function () {
  const profileData = userInfo.getUserInfo()
  nameInput.value = profileData.userName;
  jobInput.value = profileData.userDescription;
  editCardPopup.open();
};
// Обработчик клика функции
profileEditButton.addEventListener('click', openPopupEditProfile);

// Отправка формы с изменениями в профиле
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo({userName: data.userName, userDescription: data.userAbout});
  popupEditProfile.close();
};