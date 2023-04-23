class FormValidator {
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #validationForm;
  #formInputs;
  #formButton;

  constructor(validationConfig, validationForm) {
    this.#inputSelector = validationConfig.inputSelector;
    this.#submitButtonSelector = validationConfig.submitButtonSelector;
    this.#inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.#inputErrorClass = validationConfig.inputErrorClass;
    
    this.#validationForm = validationForm;
    this.#formInputs = Array.from(this.#validationForm.querySelectorAll(this.#inputSelector)); 
    this.#formButton = this.#validationForm.querySelector(this.#submitButtonSelector);
  }
  

  #setEventListeners() {
    this.#disableButton(this.#formButton);
    this.#formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.#checkInputValidity(input);
        if (this.#hasInvalidInput(this.#formInputs)) {
          this.#disableButton(this.#formButton);
        } else {
          this.#enableButton(this.#formButton);
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
    this.#validationForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
      this.#setEventListeners();
  }
}

export default FormValidator;