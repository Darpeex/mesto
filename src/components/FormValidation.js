class FormValidator {
  // Объявляем приватные свойства
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #validationForm;
  #errorElement;
  #formInputs;
  #formButton;

  // В конструктор передаём данные
  constructor(validationConfig, validationForm) {
    this.#inputSelector = validationConfig.inputSelector;
    this.#submitButtonSelector = validationConfig.submitButtonSelector;
    this.#inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.#inputErrorClass = validationConfig.inputErrorClass;
    
    this.#validationForm = validationForm; // Передаваемая форма
    this.#formInputs = Array.from(this.#validationForm.querySelectorAll(this.#inputSelector)); 
    this.#formButton = this.#validationForm.querySelector(this.#submitButtonSelector);
  }
  
  // Вешаем слушатели на элементы переданной формы и проверяем валидность
  #setEventListeners() {
    this.#disableButton(this.#formButton); // Вызывается метод неактивной кнопки для кнопки формы
    this.#formInputs.forEach((input) => { // Пробегаемся по каждому полю формы
      input.addEventListener("input", () => { // Вышаем слушатели
        this.#checkInputValidity(input); // Проверяем поля на валидность
        if (this.#hasInvalidInput(this.#formInputs)) { // Если есть невалидное поле
          this.#disableButton(this.#formButton); // Кнопка становиться неактивной
        } else { // Иначе - поля валидны (введены корректно)
          this.#enableButton(this.#formButton); // Кнопка активна
        }
      });
    });
  }

  //Проверяем поле на валидность + смена активности кнопки
  #checkInputValidity(input) {
    this.#errorElement = document.querySelector(`#${input.id}-error`); // Находим span'ы от айдишников инпут с приставкой -error
    if (input.checkValidity()) { // Если поле валидно
      this.#errorElement.textContent = ""; // Если всё хорошо, чистим поле с ошибкой
      input.classList.remove(this.#inputErrorClass); // Если всё хорошо - убираем подчёркивание красным цветом
    } else { // Иначе
      this.#errorElement.textContent = input.validationMessage; // Если что-то нехорошо, выводим сообщение об ошибке
      input.classList.add(this.#inputErrorClass); // Если что-то нехорошо - добавляем подчёркивание красным цветом
    }
  }

  // Проверка: есть ли невалидное поле
  #hasInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid); // Возвращаем, если поле не валидно
  }

  // Активная кнопка
  #enableButton(button) {
    button.classList.remove(this.#inactiveButtonClass); // удаляем модификатор неактивной кнопки
    button.removeAttribute("disabled"); // неактивность кнопки через псевдокласс ВЫКЛ
  }

  // Неактивная кнопка
  #disableButton(button) {
    button.classList.add(this.#inactiveButtonClass); // добавляем модификатор неактивной кнопки
    button.setAttribute("disabled", true); // неактивность кнопки через псевдокласс ВКЛ
  }

  // Функция проверки форм
  enableValidation() {
    this.#validationForm.addEventListener("submit", (evt) => { // Навешиваем слушатель на передоваемую форму
      evt.preventDefault(); // При subit предотвращаем тандартное действие
    });
      this.#setEventListeners(); // Вызываем приватную функцию и т.д.
  }

  // Очищаем поля при открытии
  resetPopupForm() {
    this.#errorElement.forEach((field) => field.textContent = '');
    this.#formInputs.forEach((input) => input.classList.remove(this.#inputErrorClass));
    this.#disableButton();
  }
}

export default FormValidator;