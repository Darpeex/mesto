import './index.css'; // Импорт главного файла стилей
import {
  avatarUpdateButton,
  profileEditButton,
  validationConfig,
  popupAddCardBtn,
  creationForm,
  cardTemplate,
  profileForm,
  avatarInput,
  avatarForm,
  nameInput,
  avatarSrc,
  jobInput,
  ownerId,
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
const avatarFormValidator = new FormValidator(validationConfig, avatarForm) // Экземпляр для формы обновления аватарки
profileFormValidator.enableValidation();
creationFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Класс PopupWithImage - открытие карточек
const popupWithImage = new PopupWithImage('#openCard');
popupWithImage.setEventListeners();

// Класс Section, отвечающий за отрисовку карточек на странице
const cardList = new Section({ renderer: (item) => {
  cardList.addItem(createCard(item))
}}, "#elements")

// Открыть попап добавления карточки
popupAddCardBtn.addEventListener('click', () => {
  addCardPopup.open()
});

// Удаление карточки с сервера
const popupWithСonfirmation = new PopupWithСonfirmation("#confirationPopup")
  popupWithСonfirmation.setEventListeners()

// Добавляем готовую карточку в сетку
function createCard (dataCards) {
  const card = new Card(ownerId, dataCards, cardTemplate, () => {
    popupWithImage.open({ name: dataCards.name, link: dataCards.link })
  },
  (card) => { // Открытие попапа подтверждения удаление карточки
    popupWithСonfirmation.open(() => {
    api.deleteCard(dataCards._id) // Удаление карточки с сервера
    card.openPopupDelete() 
    card.handleDeleteCard() // Удаление карточки со страницы
    });
  },
  (card) => {
    if(card.isLiked) {
      api.removeCardLike(card.data._id)
    .then ((data) => {
      card.updateLikes(data.likes)
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
    } else {
      api.addCardLike(card.data._id)
    .then((data) => {
      card.updateLikes(data.likes)
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
    }
  })
  return card.getCard(data);
};

// Добавление новой карточки
const addCardPopup = new PopupWithForm('#addCard', renderCard);
  addCardPopup.setEventListeners();

// Рендер новой картички
function renderCard(dataForm) {
    const cardData = { name: dataForm.name, link: dataForm.link };
    api.addNewCard(cardData)
    .then((newCardData) => {
      cardList.addItem(createCard(newCardData));
      creationFormValidator.resetPopupForm();
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка при создании новой карточки: ${err}`)
    })
}

// Класс PopupWithForm отвечает за редактирование профиля
const popupEditProfile = new PopupWithForm('#editProfile', handleProfileFormSubmit);
  popupEditProfile.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__activity', '.profile__avatar-image');

// // Установка данных пользователя с сервера на страницу
function getUserInfo() {return api.getUserInfo()}

// Получение данных пользователя с сервера
const openPopupEditProfile = function () {
  getUserInfo()
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
    })
    .catch ((err) => {
      console.log(`Ошибка при сохранении профиля: ${err}`);
    })
    .finally (() => {
      popupEditProfile.renderLoading(false);
    })
  };

// Экземпляр и открытие попапа обновления аватара
const editAvatar = new PopupWithForm('#updateAvatar', fetchAvatar);
  editAvatar.setEventListeners();
avatarUpdateButton.addEventListener('click', () => {
  avatarFormValidator.resetPopupForm(); // Делаем кнопку неактивной
  editAvatar.open()
})

// Обновление данных аватара на сервере и странице
async function fetchAvatar(avatar) {
  try {
    await api.editAvatar(avatar); // Отправляем данные на сервер
    const data = await getUserInfo(); // Получаем обновленные данные с сервера
    avatarSrc.src = data.avatar; // Обновляем аватар на странице
  }
  catch (err) {
    console.log(`Ошибка: ${err}`);
  }
}

// Промис с методом all выполнится только тогда, когда завершаться все промисы в первом массиве, т.е. данные придут с сервера
Promise.all([getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    avatarSrc.src = userData.avatar;
    avatarInput.value = userData.avatar; // если нужно ссылку держать видимой в строке
    cardList.renderItems(cards.reverse());
  })
  .catch(err => console.log(`Ошибка: ${err}`))