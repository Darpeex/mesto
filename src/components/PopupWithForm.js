import Popup from './Popup.js'

class PopupWithForm extends Popup {
  #handleFormSubmit;
  #submitButton;
  #formElement;
  #formValues;
  #formInput;
  #popup;
  
  constructor(popup, handleFormSubmit) {
    super(popup);
    this.#handleFormSubmit = handleFormSubmit;
    this.#formElement = popup.querySelector('.popup__form');
    this.#formInput = this.#formElement.querySelector('.popup__form-input');
    this.#submitButton = this.#formElement.querySelector('.popup__button_action_save');
  }

  #getInputValues() {
    this.#formValues = {};
    this.#formInput.forEach((input) => {
      this.#formValues[input.name] = input.value;
    });
    return this.#formValues;
  }

  setInputValues(data) {
    this.#formInput.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.#formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleFormSubmit(this.#getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this.#formElement.reset();
  }
}

export default PopupWithForm;