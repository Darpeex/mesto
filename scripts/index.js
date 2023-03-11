// Делаем выборку DOM элементов
const popupElement = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__button_action_edit');
const popupCloseButton = popupElement.querySelector('.popup__button_action_close');
const popupSaveButton = popupElement.querySelector('.popup__button_action_save');
const getName = document.querySelector ('.profile__name');
const getJob = document.querySelector('.profile__activity');
const formElement = document.querySelector('.popup__form');
// Находим поля формы
let nameInput = formElement.querySelector('.popup__form-input_field_name');
let jobInput = formElement.querySelector('.popup__form-input_field_activity');

// Открыть попап
const openPopup = function () {
  popupElement.classList.add('popup_opened');
  nameInput.value = getName.textContent;
  jobInput.value = getJob.textContent;
};

// Закрыть попап
const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

// Отправляем форму с изменениями в профиле
function handleFormSubmit (evt) {
    evt.preventDefault();
    getName.textContent = `${nameInput.value}`;
    getJob.textContent = `${jobInput.value}`;
    closePopup ();
};

popupEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);