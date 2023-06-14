import './index.css'; // добавьте импорт главного файла стилей
import {
  validationConfig,
  profileForm,
  creationForm,
  cardTemplate,
  popupAddCardBtn,
  data,
  likesCounter,
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

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '36b3d00c-eb9b-4532-a563-964663cc5274',
    'Content-Type': 'application/json'
  }
})

const profileFormValidator = new FormValidator(validationConfig, profileForm) // Экземляр для формы профиля
const creationFormValidator = new FormValidator(validationConfig, creationForm) // Экземпляр для формы добавления кнопки

profileFormValidator.enableValidation();
creationFormValidator.enableValidation();

// Класс PopupWithImage - открытие карточек
const popupWithImage = new PopupWithImage('#openCard');
popupWithImage.setEventListeners();

// Класс Section, отвечающий за отрисовку карточек на странице
const cardList = new Section({ renderer: (item) => {
  likesCounter.textContent = item.likes.length.toString();
  cardList.addItem(createCard(item))
  console.log(likesCounter.textContent)
  // const likesCounter = cardTemplate.querySelector(".elements-block__like-count"); // Счётчик лайков
  // пройти по массиву, и у каждой карточки посмотреть количество лайков, затем, установить это  в <span class="elements-block__like-count"></span>
}}, "#elements")

// Открыть попап добавления карточки
popupAddCardBtn.addEventListener('click', () => {
  addCardPopup.open()
});

// Добавляем готовую карточку в сетку
function createCard (dataCards) {
  const card = new Card('#elements', dataCards, cardTemplate, () => {
    popupWithImage.open({ name: dataCards.name, link: dataCards.link })
  })
  return card.getCard(data);
};

// Добавление новой карточки
const addCardPopup = new PopupWithForm('#addCard', renderCard);
  addCardPopup.setEventListeners();

function renderCard(dataForm) {
    const cardData = { name: dataForm.name, link: dataForm.link };
    const cardElement = createCard(cardData);

    console.log(cardData) // 
    api.addNewCard(cardData);
    cardList.addItem(cardElement);
    creationFormValidator.resetPopupForm();
    addCardPopup.close();
}

const popupEditProfile = new PopupWithForm('#editProfile', handleProfileFormSubmit);
  popupEditProfile.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__activity');

// Установка данных пользователя с сервера на страницу
const newUserData = api.getUserInfo()
  newUserData // Пока лучше не придумал
    .then((userData) => (userInfo.setUserInfo(userData))
    ).catch ((err) => console.log(`Ошибка: ${err}`))

// Получение данных пользователя с сервера
const openPopupEditProfile = function () {
  newUserData
    .then((userData) => {
      nameInput.value = userData.name;
      jobInput.value = userData.about;
      popupEditProfile.open();
    })
    .catch((err) => {
      console.log(`Ошибка при получении данных пользователя: ${err}`)
    })
};
// Обработчик клика функции
profileEditButton.addEventListener('click', openPopupEditProfile);

// Отправка формы с изменениями в профиле
async function handleProfileFormSubmit(newUserInfo) {
  popupEditProfile.renderLoading(true, 'Сохранение...');
    api.setUserInfo(newUserInfo)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    }) .catch ((err) => {
    console.log(`Ошибка при сохранении профиля: ${err}`);
    }) .finally (() => {
      popupEditProfile.renderLoading(false);
    })
  };

// Получение массива карточек с сервера
api.getInitialCards()
  .then((res) => res.reverse()) // обращаем порядок массива карточек, затем через prepend метода addItem отрисовываем и добавляем новые вначало страницы
  .then((cards) => {
    cardList.renderItems(cards);
  }).catch((err) => console.log(`Ошибка: ${err}`))

// const confiration = new PopupWithСonfiration ()