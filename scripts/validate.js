const validationConfig = ({
  formSelector: '.popup__form', // селектор форм
  inputSelector: '.popup__form-input', // селектор полей ввода
  submitButtonSelector: '.popup__button', // селектор кнопки попапа
  inactiveButtonClass: 'popup__button_invalid', // модификатор неактивной кнопки
  activeButtonClass: 'popup__button_valid', // модификатор активной кнопки
  inputErrorClass: 'popup__form-input_error', // модификатор сообщения об ошибке
  errorClass: 'popup__error_visible' // =()_()=
});

// Запускаем процесс проверки
const enableValidation = ({formSelector, ...rest}) => { // получаем селектор "форм" из массива данных
  const forms = Array.from(document.querySelectorAll(formSelector)) // создаём массив из "форм"
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setFormEventListeners(form, rest) // передаем аргументы
  })
}

// Устанавливаем слушатели и реагируем на информацию с полей (добавляем, убираем подсказки)
const setFormEventListeners = (formToValidate, {inputSelector, submitButtonSelector, ...rest}) => {
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector))
  const formButton = formToValidate.querySelector(submitButtonSelector)
  disableButton(formButton, rest)
  formInputs.forEach(input => {
    input.addEventListener('input', () => { // проверка происходит по инпуту (при нужатии на клавишу в поле ввода)
      checkInputValidity(input, rest)
      if (hasInvalidImput(formInputs)) {
        disableButton(formButton, rest)
      } else {
        enableButton(formButton, rest)
      }
    })
  })
}

// Проверка на валидность + добавление стилей и текстов ошибки
const checkInputValidity = (input, {inactiveButtonClass, activeButtonClass, inputErrorClass, ...rest}) => {
  const currentInputErorrContainer = document.querySelector(`#${input.id}-error`) // Находим span'ы от айдишников инпут с приставкой -error
  const currentInputErorrContainerLine = document.querySelector(`#${input.id}`) // Сами input'ы
  if (input.checkValidity()) { // Валидно (прошло проверку)
    currentInputErorrContainer.textContent = ''
    currentInputErorrContainerLine.classList.remove(inputErrorClass)
  } else { // Невалидно (не прошло проверку)
    currentInputErorrContainer.textContent = input.validationMessage // Если что-то нехорошо - выводим сообщение об ошибки
    currentInputErorrContainerLine.classList.add(inputErrorClass) // Если что-то нехорошо - добавляем подчёркивание красным цветом
  }
}

// Проверка: есть ли невалидное поле
const hasInvalidImput = (formInputs) => { // функция проверки на невалидное поле
  return formInputs.some(item => !item.validity.valid) // возвращаем, если какое-то поле не валидно
}

// Кнопка становиться активной
const enableButton = (button, {inactiveButtonClass, activeButtonClass, ...rest}) => {
  button.classList.remove(inactiveButtonClass); // удаляем модификатор неактивной кнопки
  button.removeAttribute('disabled'); // неактивность кнопки через псевдокласс ВЫКЛ
}

// Кнопка становиться неактивной
const disableButton = (button, {inactiveButtonClass, activeButtonClass, ...rest}) => { // делаем кнопку недоступной
  button.classList.add(inactiveButtonClass); // добавляем класс неактивной кнопки
  button.setAttribute('disabled', true); // неактивность кнопки через псевдокласс ВКЛ
}

// Функция проверки форм
enableValidation(validationConfig)