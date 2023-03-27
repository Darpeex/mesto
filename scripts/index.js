// Делаем выборку DOM элементов
const popupProfile = document.querySelector('#editProfile');
const profileEditButton = document.querySelector('.profile__button_action_edit');
const profileSaveButton = popupProfile.querySelector('.popup__button_action_save');
const getName = document.querySelector('.profile__name');
const getJob = document.querySelector('.profile__activity');
const profileForm = document.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__form-input_field_name');
const jobInput = profileForm.querySelector('.popup__form-input_field_activity');
const cardsContainer = document.querySelector(".elements");
const cardTemplate = cardsContainer.querySelector('#template').content;
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
const data = {name: '.elements-block__name', link: '.elements-block__image'};
const popupAddCard = document.querySelector('#addCard');
const popupAddCardBtn = document.querySelector('.profile__button_action_add');
const creationForm = popupAddCard.querySelector('.popup__creationForm');
const makeCard = popupAddCard.querySelector('.popup__button_action_create');
const getCardName = creationForm.querySelector ('.popup__form-input_field_cardName');
const getSrcImg = creationForm.querySelector('.popup__form-input_field_srcImg');
const openCard = document.querySelector("#openCard");
const popupImage = openCard.querySelector('.popup__image-card');
const popupSubtitle = openCard.querySelector('.popup__image-subtitle');
const imagePopupOpenBtn = document.querySelector('.elements-block__image');
const cardTitle = document.querySelector(".elements-block__name");
const elementBlock = document.querySelector(".elements-block");
 
const popup = document.querySelector('.popup');
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// СПРИНТ 4
// Открыть попап редактирования
const openPopupEditProfile = function () {
  popupProfile.classList.add('popup_opened');
  nameInput.value = getName.textContent;
  jobInput.value = getJob.textContent;
};
// Отправляем форму с изменениями в профиле
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    getName.textContent = `${nameInput.value}`;
    getJob.textContent = `${jobInput.value}`;
    closePopup(popupProfile);
};
profileEditButton.addEventListener('click', openPopupEditProfile);
profileForm.addEventListener('submit', handleProfileFormSubmit);

// СПРИНТ 5
// 0. Шесть карточек «из коробки»

// 1. Функция добавления карточки
function createCard (data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".elements-block__image");
  cardElement.querySelector(".elements-block__name").textContent = data.name;
  cardImage.src = data.link; 
  cardImage.alt = data.name; // alt
  setEventListeners(cardElement);
  cardsContainer.prepend(cardElement);
  return cardElement;
};
initialCards.reverse().forEach(createCard);

// 2. Форма добавления карточки
// Открыть попап добавления карточки
const openPopupAddCard = function () {
  popupAddCard.classList.add('popup_opened');
};
popupAddCardBtn.addEventListener('click', openPopupAddCard);

// 3. Добавление карточки
const renderCard = (evt) => {
  if (getCardName.value.length <= 1 || getSrcImg.value.length <= 1) {stop;}
  else {
    evt.preventDefault();
    const data = {name: '.elements-block__name', link: '.elements-block__image'};
    data.name = getCardName.value;
    data.link = getSrcImg.value;
    createCard(data);
    getCardName.value = '';
    getSrcImg.value = '';
    closePopup(popupAddCard);}
}
makeCard.addEventListener('click', renderCard);

// 4. Лайк карточки
function toggleLike (evt) {
    evt.target.classList.toggle('elements-block__like-button_active');
};

// 5. Удаление карточки
function handleDelete (evt) {
  const card = evt.target.closest('.elements-block');
  card.remove();
}

// 6. Открытие попапа с картинкой
function openPopupCard (evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = data.name;
  popupImage.alt = evt.target.alt;
  popupSubtitle.textContent = evt.target.alt;
  openCard.classList.add('popup_opened');
  // console.log(popupImage.src);
  // console.log(popupImage.alt);
  // console.log(popupSubtitle.textContent);
}

function setEventListeners (cardElement) {
  cardElement.querySelector(".elements-block__delete-button").addEventListener('click', handleDelete);
  cardElement.querySelector(".elements-block__like-button").addEventListener('click', toggleLike);
  cardElement.querySelector(".elements-block__image").addEventListener('click', openPopupCard);
}

// Общий обработчик для кнопок закрытия (крестиков)
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__button_action_close');
// с окончанием `s`, так как кнопок много
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});