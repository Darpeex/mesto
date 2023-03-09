// Делаем выборку DOM элементов
const popupElement = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__info_edit-button');
const popupCloseButton = popupElement.querySelector('.popup__submit-button_action_close');
const popupSaveButton = popupElement.querySelector('.popup__submit-button_action_save');
const getName = document.querySelector ('.profile__info-text_name');
const getJob = document.querySelector('.profile__info-text_activity');
const formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__form-name');
let jobInput = formElement.querySelector('.popup__form-activity');

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

// 
function handleFormSubmit (evt) {
    evt.preventDefault();
    getName.textContent = `${nameInput.value}`;
    getJob.textContent = `${jobInput.value}`;
    closePopup ();
}

popupEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);