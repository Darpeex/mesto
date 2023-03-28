// Выборка DOM элементов
const popupProfile = document.querySelector('#editProfile'); // Попап редактирования профиля
const profileEditButton = document.querySelector('.profile__button_action_edit'); // Кнопка открытия попапа редактирования профиля
const profileSaveButton = popupProfile.querySelector('.popup__button_action_save'); // Кнопка отправки формы редактирования профиля
const getName = document.querySelector('.profile__name'); // Получение имени из профиля (для формы)
const getJob = document.querySelector('.profile__activity'); // Получение рода деятельности из профиля (для формы)
const profileForm = document.querySelector('.popup__form'); // Форма попапа профиля
const nameInput = profileForm.querySelector('.popup__form-input_field_name'); // Поле формы попапа профиля для имени
const jobInput = profileForm.querySelector('.popup__form-input_field_activity'); // Поле формы попапа профиля для рода деятельности

const cardsContainer = document.querySelector(".elements"); // Контейнер, содержащий карточки
const cardTemplate = cardsContainer.querySelector('#template').content; // Темплейт и всё его содержимое (".content")
const initialCards = [
  {
    name: 'Казанский Собор',
    link: 'https://images.unsplash.com/photo-1625259566209-8c59614a28fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Бамбуковая роща',
    link: 'https://images.unsplash.com/photo-1510422908328-746ed313f736?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
  },
  {
    name: 'Япония',
    link: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1669999197560-6a27f5d274f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=380&q=80'
  },
  {
    name: 'Екатеринбург',
    link: 'https://images.unsplash.com/photo-1602354949094-d4a7286c8f6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80'
  }
]; // Массив с данными для первоначальных карточек на странице
const data = {name: '.elements-block__name', link: '.elements-block__image'}; // Данные name (имя) и link (ссылка на карточку) для полей

const popupAddCard = document.querySelector('#addCard'); // Попап добавления карточки
const popupAddCardBtn = document.querySelector('.profile__button_action_add'); // Кнопка открытия попапа добавления карточки
const creationForm = popupAddCard.querySelector('.popup__creationForm'); // Форма попапа добавления карточки
const makeCard = popupAddCard.querySelector('.popup__button_action_create'); // Кнопка отправки формы добавления карточки
const getCardName = creationForm.querySelector ('.popup__form-input_field_cardName'); // Поле формы попапа добавления карточки для имени
const getSrcImg = creationForm.querySelector('.popup__form-input_field_srcImg'); // Поле формы попапа добавления карточки для картинки (ссылка)

const openCard = document.querySelector("#openCard"); // Попап открытия карточки
const popupImage = openCard.querySelector('.popup__image-card'); // Картинка попапа открытия карточки
const popupSubtitle = openCard.querySelector('.popup__image-subtitle'); // Имя картинки попапа открытия карточки
const imagePopupOpenBtn = document.querySelector('.elements-block__image'); // Картинка карточки в роли кнопки открытия этого попапа
const cardTitle = document.querySelector(".elements-block__name"); // Имя карточки, соответствующее картинке открытия карточки ↑
const elementBlock = document.querySelector(".elements-block"); // Карточка со всем её содержимым (Картинка, текст, кнопки лайка/удаления)