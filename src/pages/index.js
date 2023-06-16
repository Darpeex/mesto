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
      card.openPopupDelete();
      api.deleteCard(card.data._id) // Удаление карточки с сервера
        .then(() => {
          card.handleDeleteCard(); // Удаление карточки со страницы
          popupWithСonfirmation.close(); // Закрытие попапа
        })
        .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
        .finally(() => {
          popupWithСonfirmation.renderLoading(false);
        });
      popupWithСonfirmation.renderLoading(true, 'Удаление...');
    });
  },
  (card) => { // Вычисление собственных лайков на странице
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
    return card.getCard(data)
};

// Добавление новой карточки
const addCardPopup = new PopupWithForm('#addCard', renderCard);
  addCardPopup.setEventListeners();

// Рендер новой картички
function renderCard(dataForm) {
  const cardData = { name: dataForm.name, link: dataForm.link };
  addCardPopup.renderLoading(true, 'Создание...');
  api.addNewCard(cardData)
    .then((newCardData) => {
      cardList.addItem(createCard(newCardData));
      creationFormValidator.resetPopupForm();
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка при создании новой карточки: ${err}`)
    })
    .finally (() => {
      addCardPopup.renderLoading(false);
    })
}

// Класс PopupWithForm отвечает за редактирование профиля
const popupEditProfile = new PopupWithForm('#editProfile', handleProfileFormSubmit);
  popupEditProfile.setEventListeners();
const userInfo = new UserInfo('.profile__name', '.profile__activity', '.profile__avatar-image');

// Получение данных пользователя с сервера
const openPopupEditProfile = function () {
  console.log(userInfo.getUserInfo())
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  // avatarInput.value = userData.avatar; // Наверное, в этом попапе не нужно
  popupEditProfile.open();
};
// Обработчик клика функции
profileEditButton.addEventListener('click', openPopupEditProfile);

// Отправка формы с изменениями в профиле
function handleProfileFormSubmit(newUserInfo) {
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

// Получаем данные пользователя с сервера
function getUserInfo() {
  return api.getUserInfo()
}

// Обновление данных аватара на сервере и странице
function fetchAvatar(avatar) {
  editAvatar.renderLoading(true, 'Сохранение...');
  api.editAvatar(avatar) // Отправляем данные на сервер
    .then(() => {
      return getUserInfo(); // Получаем обновленные данные с сервера
    })
    .then((data) => {
      avatarSrc.src = data.avatar; // Обновляем аватар на странице
      editAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка обновления данных на сервере: ${err}`);
    })
    .finally (() => {
      editAvatar.renderLoading(false);
    });
};

// Промис с методом all выполнится только тогда, когда завершаться все промисы в первом массиве, т.е. данные придут с сервера
Promise.all([getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    avatarSrc.src = userData.avatar;
    avatarInput.value = userData.avatar;
    cardList.renderItems(cards.reverse());
  })
  .catch(err => console.log(`Ошибка при получении данных с сервера: ${err}`))