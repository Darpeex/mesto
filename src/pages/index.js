import './index.css'; // добавьте импорт главного файла стилей
import {
  validationConfig,
  profileForm,
  creationForm,
  // initialCards,
  cardTemplate,
  popupAddCardBtn,
  data,
  profileEditButton,
  nameInput,
  jobInput,
} from "../utils/constants.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidation.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";



// Спринт 9

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '36b3d00c-eb9b-4532-a563-964663cc5274',
    'Content-Type': 'application/json'
  }
})

// Спринт 9



const profileFormValidator = new FormValidator(validationConfig, profileForm) // Экземляр для формы профиля
const creationFormValidator = new FormValidator(validationConfig, creationForm) // Экземпляр для формы добавления кнопки

profileFormValidator.enableValidation();
creationFormValidator.enableValidation();

// Класс PopupWithImage - открытие карточек
const popupWithImage = new PopupWithImage('#openCard');
popupWithImage.setEventListeners();

// Класс Section, отвечающий за отрисовку карточек на странице
const cardList = new Section({ renderer: (item) => {
  cardList.addItem(createCard(item))
}}, "#elements")
// cardList.renderItems(initialCards);

// Открыть попап добавления карточки
popupAddCardBtn.addEventListener('click', () => {
  addCardPopup.open()
});

// Добавляем готовую карточку в сетку
function createCard (dataCards) {
  const card = new Card('#elements', dataCards, cardTemplate, () => {
    popupWithImage.open({ name: dataCards.name, link: dataCards.link })
  })
  
  const cardElement = card.getCard()
  return(cardElement);
};

// Добавление новой карточки
const addCardPopup = new PopupWithForm('#addCard', renderCard);
  addCardPopup.setEventListeners();

function renderCard(dataForm) {
    data.name = dataForm.cardName;
    data.link = dataForm.cardLink;

    const cardElement = createCard(data);
    cardList.addItem(cardElement);
    creationFormValidator.resetPopupForm();
    addCardPopup.close();
}

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

// Перенести вставку карточки



// Спринт 9

api.getInitialCards().then((cards) => {
  cardList.renderItems(cards);
  // Код, который пробегает по карточкам и отрисовывать эту карточку // 53  минута вебинара 
}).catch((err) => console.log(`catch: ${err}`))

api.getUserInfo()