const form = document.querySelector('.popup__form');
const formInput = document.querySelector('.popup__form-input')
const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

const enableValidation = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault()
  })
  setFormEventListeners(form) 
}

const setFormEventListeners = (form) => {
  const formInputs = Array.from(form.querySelectorAll('.popup__form-input'))
  const formButton = form.querySelector('.popup__button')
  disableButton(formButton)
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input)
      if (hasInvalidImput(formInputs)) {
        disableButton(formButton)
      } else {
        enableButton(formButton)
      }
    })
  })
}

const checkInputValidity = (input) => {
  const currentInputErorrContainer = document.querySelector(`#${input.id}-error`)
  if (input.checkValidity()) { // Валидно (прошло проверку)
    currentInputErorrContainer.textContent = ''
    formInput.classList.remove('popup__form-input_error')
  } else { // Невалидно (не прошло проверку)
    formInput.classList.add('popup__form-input_error')
    currentInputErorrContainer.textContent = input.validationMessage
  }
}

const hasInvalidImput = (formInputs) => {
  return formInputs.some(item => !item.validity.valid)
}

const enableButton = (button) => {
  button.classList.remove('popup__button_invalid');
  button.classList.add('popup__button_valid');
  // button.setAttribute('disabled', true);
}

const disableButton = (button) => {
  button.classList.add('popup__button_invalid');
  button.classList.remove('popup__button_valid');
  // button.removeAttribute('disabled');
}

enableValidation()



// 1. Валидация формы «Редактировать профиль»


// 2. Валидация формы «Новое место»

// Валидируйте форму добавления места.
// Не нужна проверка длины текста у поля ссылки.
// Нужна проверка того, что ввели именно ссылку.
// Используйте стандартные браузерные тексты ошибок.
// Если хотя бы одно из полей не прошло валидацию, кнопка «Сохранить» должна быть неактивной. Если оба поля прошли — активной. Цвета неактивных кнопок те же.


// // включение валидации вызовом enableValidation
// // все настройки передаются при вызове

