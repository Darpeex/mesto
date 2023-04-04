const validationConfig = ({
  formSelector: '.popup__form', // селектор форм
  inputSelector: '.popup__form-input', // селектор полей ввода
  submitButtonSelector: '.popup__button', // селектор кнопки попапа
  inactiveButtonClass: 'popup__button_invalid', // селектор стиля не активной кнопки
  activeButtonClass: 'popup__button_valid', // селектор стиля валидной кнопки
  inputErrorClass: 'popup__form-input_error', // селектор стилей сообщения об ошибке
  errorClass: 'popup__error_visible' // =()_()=
}); // Селекторы

// 
const enableValidation = ({formSelector, ...rest}) => { // получаем селектор "форм"
  const forms = Array.from(document.querySelectorAll(formSelector))  // создаём массив из форм
  forms.forEach(form => { // на каждую форму вешаем слушатель
    form.addEventListener('submit', (evt) => { // отправка формы
      evt.preventDefault() // отмена стандартного поведения браузера 
    })
    setFormEventListeners(form, rest) // передаем аргументы
  })
}

const setFormEventListeners = (formToValidate, {inputSelector, submitButtonSelector, ...rest}) => { // получаем селекторы инпутов форм и кнопок отправки
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector)) // создаём массив из input
  const formButton = formToValidate.querySelector(submitButtonSelector) // создаём константу содержащую кнопку
  disableButton(formButton, rest) // функция отключения кнопки с передаваемыми аргументами кнопки и оставшегося из массива validationConfig
  formInputs.forEach(input => { // для каждого поля input
    input.addEventListener('input', () => { // вешаем слушатель
      checkInputValidity(input, rest) // проверка на валидацию и передача аргументов
      if (hasInvalidImput(formInputs)) { // если одно из полей не валидно
        disableButton(formButton, rest) // кнопка неактивна
      } else { // если валидны все поля
        enableButton(formButton, rest) // кнопка активна
      }
    })
  })
}

const checkInputValidity = (input, {inactiveButtonClass, activeButtonClass, inputErrorClass, ...rest}) => { // Проверка полей на валидность. Получаем селекторы ...
  const currentInputErorrContainer = document.querySelector(`#${input.id}-error`) // Добавляем к определенному инпуту приставку "-error"
  if (input.checkValidity()) { // Валидно (прошло проверку)
    currentInputErorrContainer.textContent = '' // Если всё хорошо - ошибки нет
    formInput.classList.remove(inputErrorClass) // Если всё хорошо - убираем модификатор с ошибкой
  } else { // Невалидно (не прошло проверку)
    formInput.classList.add(inputErrorClass) // Если что-то нехорошо - добавляем подчёркивание красным цветом
    currentInputErorrContainer.textContent = input.validationMessage // Если что-то нехорошо - выводим сообщение об ошибки
  }
}

const hasInvalidImput = (formInputs) => { // функция проверки на невалидное поле
  return formInputs.some(item => !item.validity.valid) // возвращаем, если какое-то поле не валидно
}

const enableButton = (button, {inactiveButtonClass, activeButtonClass, ...rest}) => { // делаем кнопку доступной
  button.classList.remove(inactiveButtonClass); // удаляем модификатор неактивной кнопки
  button.classList.add(activeButtonClass); // добавляем модификатор валидной кнопки
  // button.removeAttribute('disabled'); // неактивность кнопки через псевдокласс ВЫКЛ
}

const disableButton = (button, {inactiveButtonClass, activeButtonClass, ...rest}) => { // делаем кнопку недоступной
  button.classList.add(inactiveButtonClass); // добавляем класс неактивной кнопки
  button.classList.remove(activeButtonClass); // удаляем класс активной кнопки
  // button.setAttribute('disabled', true); // неактивность кнопки через псевдокласс ВКЛ
}

enableValidation(validationConfig) // вызываем функцию проверки формы