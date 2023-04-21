class FormValidator {
  constructor(config) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._activeButtonClass = config.activeButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _setEventListeners(form) {
    const formInputs = Array.from(form.querySelectorAll(this._inputSelector));
    const formButton = form.querySelector(this._submitButtonSelector);
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
      input.classList.remove(this._inputErrorClass);
    } else {
      errorElement.textContent = input.validationMessage;
      input.classList.add(this._inputErrorClass);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid);
  }

  _enableButton(button) {
    button.classList.remove(this._inactiveButtonClass);
    button.removeAttribute("disabled");
  }

  _disableButton(button) {
    button.classList.add(this._inactiveButtonClass);
    button.setAttribute("disabled", true);
  }

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
    forms.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(form);
    });
  }
}

export default FormValidator;