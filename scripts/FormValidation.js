class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;

  constructor(validationConfig, popupForm) {
    this.#formSelector = validationConfig.formSelector;
    this.#inputSelector = validationConfig.inputSelector;
    this.#submitButtonSelector = validationConfig.submitButtonSelector;
    this.#inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.#inputErrorClass = validationConfig.inputErrorClass;
  }
  

  #setEventListeners(form) { 
    const formInputs = Array.from(form.querySelectorAll(this.#inputSelector)); // Обязательно ли переность эти две константы в свойства? Если они используются -
    const formButton = form.querySelector(this.#submitButtonSelector); // только в этом методе, а в свойства ещё нужно form из enableValidation метода подтянуть
    this.#disableButton(formButton);
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.#checkInputValidity(input);
        if (this.#hasInvalidInput(formInputs)) {
          this.#disableButton(formButton);
        } else {
          this.#enableButton(formButton);
        }
      });
    });
  }

  #checkInputValidity(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) {
      errorElement.textContent = "";
      input.classList.remove(this.#inputErrorClass);
    } else {
      errorElement.textContent = input.validationMessage;
      input.classList.add(this.#inputErrorClass);
    }
  }

  #hasInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid);
  }

  #enableButton(button) {
    button.classList.remove(this.#inactiveButtonClass);
    button.removeAttribute("disabled");
  }

  #disableButton(button) {
    button.classList.add(this.#inactiveButtonClass);
    button.setAttribute("disabled", true);
  }

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this.#formSelector));
    forms.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this.#setEventListeners(form);
    });
  }
}

export default FormValidator;