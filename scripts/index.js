// Делаем выборку DOM элементов
const popupProfile = document.querySelector('#editProfile');
const popupEditButton = document.querySelector('.profile__button_action_edit');
const popupCloseButtonProfile = popupProfile.querySelector('.popup__button_action_close');
const popupSaveButton = popupProfile.querySelector('.popup__button_action_save');
const getName = document.querySelector ('.profile__name');
const getJob = document.querySelector('.profile__activity');
const formElement = document.querySelector('.popup__form');
// Находим поля формы
let nameInput = formElement.querySelector('.popup__form-input_field_name');
let jobInput = formElement.querySelector('.popup__form-input_field_activity');


// СПРИНТ 4
// Открыть попап редактирования
const openPopupEditProfile = function () {
  popupProfile.classList.add('popup_opened');
  nameInput.value = getName.textContent;
  jobInput.value = getJob.textContent;
};
// Закрыть попап
const closePopupEditProfile = function () {
  popupProfile.classList.remove('popup_opened');
};
// Отправляем форму с изменениями в профиле
function handleFormSubmit (evt) {
    evt.preventDefault();
    getName.textContent = `${nameInput.value}`;
    getJob.textContent = `${jobInput.value}`;
    closePopupEditProfile ();
};
popupEditButton.addEventListener('click', openPopupEditProfile);
popupCloseButtonProfile.addEventListener('click', closePopupEditProfile);
formElement.addEventListener('submit', handleFormSubmit);


// СПРИНТ 5
// 0. Шесть карточек «из коробки»
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
]; 
const cardsContainer = document.querySelector(".elements");
const cardTemplate = cardsContainer.querySelector('#template').content;
let data = {name: '.elements-block__name', link: '.elements-block__image'};

// 1. Функция добавления карточки
function createCard (data) {
  let cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".elements-block__name").textContent = data.name;
  cardElement.querySelector(".elements-block__image").src = data.link; 
  cardElement.querySelector(".elements-block__image").alt = data.name; // alt
  setEventListeners(cardElement);
  cardsContainer.prepend(cardElement);
  return cardElement;
};
initialCards.reverse().forEach(createCard);

// 2. Форма добавления карточки
// Делаем выборку из DOM элементов
let popupAddCard = document.querySelector('#addCard');
let popupAddCardBtn = document.querySelector('.profile__button_action_add');
let popupCloseCardBtn = popupAddCard.querySelector('.popup__button_action_close');
// Открыть попап добавления карточки
const openPopupAddCard = function () {
  popupAddCard.classList.add('popup_opened');
};
// Закрыть попап
const closePopupAddCard = function () {
  popupAddCard.classList.remove('popup_opened');
  getCardName.value = '';
  getSrcImg.value = '';
};
popupAddCardBtn.addEventListener('click', openPopupAddCard);
popupCloseCardBtn.addEventListener('click', closePopupAddCard);

// 3. Добавление карточки
const creationForm = popupAddCard.querySelector('.popup__creationForm');
const makeCard = popupAddCard.querySelector('.popup__button_action_create');
const getCardName = creationForm.querySelector ('.popup__form-input_field_cardName');
const getSrcImg = creationForm.querySelector('.popup__form-input_field_srcImg');

const renderCard = (evt) => {
  if (getCardName.value.length <= 1 || getSrcImg.value.length <= 1) {stop;}
  else {
    evt.preventDefault();
    data.name = getCardName.value;
    data.link = getSrcImg.value;
    createCard(data);
    closePopupAddCard();}
}
makeCard.addEventListener('click', renderCard);

// 4. Лайк карточки
function cardLiker (evt) {
    evt.target.classList.toggle('elements-block__like-button_active');
};

// 5. Удаление карточки
function handleDelete (evt) {
  const card = evt.target.closest('.elements-block');
  card.remove();
}

// 6. Открытие попапа с картинкой
const openCard = document.querySelector("#openCard");
const popupImage = openCard.querySelector('.popup__image-card');
const popupSubtitle = openCard.querySelector('.popup__image-subtitle');
const popupCloseFullScreenBtn = openCard.querySelector('.popup__button_action_close');
const imagePopupOpenBtn = document.querySelector('.elements-block__image');
const cardTitle = document.querySelector(".elements-block__name");
const elementBlock = document.querySelector(".elements-block");
const elementTitle = elementBlock.querySelector(".elements-block__text");
function openPopupCard (evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = data.name;
  popupImage.alt = evt.target.alt;
  popupSubtitle.textContent = evt.target.alt;
  openCard.classList.add('popup_opened');
  console.log(popupImage.src);
  console.log(popupImage.alt);
  console.log(popupSubtitle.textContent);
}
const closePopupCard = function () {
  openCard.classList.remove('popup_opened');
};

popupCloseFullScreenBtn.addEventListener('click', closePopupCard);
function setEventListeners (cardElement) {
  cardElement.querySelector(".elements-block__delete-button").addEventListener('click', handleDelete);
  cardElement.querySelector(".elements-block__like-button").addEventListener('click', cardLiker);
  cardElement.querySelector(".elements-block__image").addEventListener('click', openPopupCard);
}