// Выборка DOM элементов
export const popupProfile = document.querySelector('#editProfile'); // Попап редактирования профиля
export const profileEditButton = document.querySelector('.profile__button_action_edit'); // Кнопка открытия попапа редактирования профиля
export const profileForm = document.querySelector('.popup__editForm'); // Форма попапа профиля
export const nameInput = profileForm.querySelector('.popup__form-input_field_name'); // Поле формы попапа профиля для имени
export const jobInput = profileForm.querySelector('.popup__form-input_field_activity'); // Поле формы попапа профиля для рода деятельности

export const cardsContainer = document.querySelector("#elements"); // Контейнер, содержащий карточки
export const cardTemplate = cardsContainer.querySelector('#template').content.querySelector('.elements-block'); // Темплейт и содержимое элемента
export const initialCards = [
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80'
  },
  {
    name: 'Екатеринбург',
    link: 'https://images.unsplash.com/photo-1602354949094-d4a7286c8f6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1669999197560-6a27f5d274f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=380&q=80'
  },
  {
    name: 'Япония',
    link: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
  },
  {
    name: 'Бамбуковая роща',
    link: 'https://images.unsplash.com/photo-1510422908328-746ed313f736?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
  },
  {
    name: 'Казанский Собор',
    link: 'https://images.unsplash.com/photo-1625259566209-8c59614a28fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  }
]; // Массив с данными для первоначальных карточек на странице // Позвольте оставить, пожалуйста, если не критично

// export const data = {
//   cardName: '.elements-block__name', // название карточки
//   cardlink: '.elements-block__image', // ссылка на карточку
//   name: '.popup__form-input_field_name', // имя пользователя
//   about: '.popup__form-input_field_activity', // о пользователе
//   avatar: '.profile__avatar-image', // ссылка на аватарку профиля
//   // _id: '.profile__avatar-image' // идентификатор пользователя
// };

// export const data = {name: '.elements-block__name', link: '.elements-block__image'}; // Данные name (имя) и link (ссылка на карточку) для полей
// export const userData = {name: nameInput.textContent, about: jobInput.value}; // Попап добавления карточки
export const likesCounter = cardTemplate.querySelector(".elements-block__like-count"); // Счётчик лайков

export const popupAddCard = document.querySelector('#addCard'); // Попап добавления карточки
export const popupAddCardBtn = document.querySelector('.profile__button_action_add'); // Кнопка открытия попапа добавления карточки
export const creationForm = popupAddCard.querySelector('.popup__creationForm'); // Форма попапа добавления карточки
export const nameCard = creationForm.querySelector ('.popup__form-input_field_nameCard'); // Поле формы попапа добавления карточки для имени
export const srcImg = creationForm.querySelector('.popup__form-input_field_srcImg'); // Поле формы попапа добавления карточки для картинки (ссылка)

export const validationConfig = {
  formSelector: ".popup__form", // селектор форм
  inputSelector: ".popup__form-input", // селектор полей ввода
  submitButtonSelector: ".popup__button", // селектор кнопки попапа
  inactiveButtonClass: "popup__button_invalid", // модификатор неактивной кнопки
  activeButtonClass: "popup__button_valid", // модификатор активной кнопки
  inputErrorClass: "popup__form-input_error", // модификатор сообщения об ошибке
  errorClass: "popup__error_visible" // =()_()=
}; // Селекторы и модификаторы форм