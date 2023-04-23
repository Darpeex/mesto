class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #validationForm;
  #form;

  constructor(validationConfig, validationForm) {
    this.#formSelector = validationConfig.formSelector; // Через форм селектор без передачи не следует делать? (Как было - тоже работает, через this. тем более, заранее спасибо))
    this.#inputSelector = validationConfig.inputSelector;
    this.#submitButtonSelector = validationConfig.submitButtonSelector;
    this.#inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.#inputErrorClass = validationConfig.inputErrorClass;
    this.#validationForm = validationForm.validationForm;
  }
  

  #setEventListeners() { 
    const formInputs = Array.from(this.#form.querySelectorAll(this.#inputSelector)); 
    const formButton = this.#form.querySelector(this.#submitButtonSelector);
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
    const forms = Array.from(document.querySelectorAll(this.#validationForm));
    forms.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this.#form = form;
      this.#setEventListeners();
    });
  }
}

export default FormValidator;