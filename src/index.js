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

const popupEditProfile = new PopupWithForm(profileForm, handleProfileFormSubmit);
const userInfo = new UserInfo( getName, getJob )

// Редактирование профиля
const openPopupEditProfile = function () {
  const profileData = userInfo.getUserInfo()
  nameInput.value = profileData.userName;
  jobInput.value = profileData.userDescription;
  editCardPopup.open();

  popupEditProfile.setEventListeners();
  profileFormValidator.enableValidation();
};
// Обработчик клика функции
profileEditButton.addEventListener('click', openPopupEditProfile);

// Отправка формы с изменениями в профиле
function handleProfileFormSubmit(data) {
  console.log({userName: data.userName, userDescription: data.userAbout})
  userInfo.setUserInfo({userName: data.userName, userDescription: data.userAbout});
  popupEditProfile.close();
};