import './index.css'; // Импорт главного файла стилей
import {
  profileEditButton,
  confirmationPopup,
  validationConfig,
  popupAddCardBtn,
  likesCounter,
  creationForm,
  cardTemplate,
  profileForm,
  nameInput,
  jobInput,
  data
} from "../utils/constants.js"
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithСonfirmation from "../components/PopupWithСonfirmation.js";

// Класс Api, отвечающий за запросы к серверу
const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '36b3d00c-eb9b-4532-a563-964663cc5274',
    'Content-Type': 'application/json'
  }
})

// Проверка форм на валидность
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

// Рендер новой картички
function renderCard(dataForm) {
    const cardData = { name: dataForm.name, link: dataForm.link };

    api.addNewCard(cardData);
    cardList.addItem(createCard(cardData));
    creationFormValidator.resetPopupForm();
    addCardPopup.close();
}

// Класс PopupWithForm отвечает за редактирование профиля
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


  // const _id = '6489713ca097ce0864fca12a'
  // console.log(_id)
  // api.deleteCard(_id)

// // Удаление карточки с сервера
// const popupWithСonfirmation = new PopupWithСonfirmation(confirmationPopup, () => {
//   const _id = '64897ce9db90cf087c1ccbd6'
//     api.deleteCard(_id)
//     card.handleDelete()
// })
//   popupWithСonfirmation.setEventListeners()