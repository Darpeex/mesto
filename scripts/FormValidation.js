class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;

  constructor(validationConfig) {
    this.#formSelector = validationConfig.formSelector;
    this.#inputSelector = validationConfig.inputSelector;
    this.#submitButtonSelector = validationConfig.submitButtonSelector;
    this.#inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.#inputErrorClass = validationConfig.inputErrorClass;
  }

  _setEventListeners(form) {
    const formInputs = Array.from(form.querySelectorAll(this.#inputSelector));
    const formButton = form.querySelector(this.#submitButtonSelector);
    this._disableButton(formButton);
    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput(formInputs)) {
          this._disableButton(formButton);
        } else {
          this._enableButton(formButton);
        }
      });
    });
  }

  _checkInputValidity(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) {
      errorElement.textContent = "";
      input.classList.remove(this.#inputErrorClass);
    } else {
      errorElement.textContent = input.validationMessage;
      input.classList.add(this.#inputErrorClass);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid);
  }

  _enableButton(button) {
    button.classList.remove(this.#inactiveButtonClass);
    button.removeAttribute("disabled");
  }

  _disableButton(button) {
    button.classList.add(this.#inactiveButtonClass);
    button.setAttribute("disabled", true);
  }

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this.#formSelector));
    forms.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(form);
    });
  }
}

export default FormValidator;