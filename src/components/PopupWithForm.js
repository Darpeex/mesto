import Popup from './Popup.js'

class PopupWithForm extends Popup {
  #submitButtonText;
  _submitCallback;
  #submitButton;
  #formElement;
  #template;
  #inputs;
  
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this.#formElement = document.querySelector(popupSelector).querySelector('.popup__form');
    this.#inputs = this.#formElement.querySelectorAll('.popup__form-input');
    this.#submitButton = this.#formElement.querySelector('button[type="submit"]');
    this.#submitButtonText = this.#submitButton.textContent;
  }

  #getInputValues() {
    const values = {};
    this.#inputs.forEach(input => {
      values[input.name] = input.value;
    });
    // console.log(values);
    return values;
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._submitCallback(this.#getInputValues());
    super.close()
  }

  setEventListeners() {
    super.setEventListeners();
    this.#formElement.addEventListener('submit', this.#submitHandler);
  }

  close() {
    super.close();
    this.#formElement.reset();
  }
  
  renderLoading(isLoading, text) {
    if (isLoading) {
        this.#submitButton.textContent = text;
    } else {
        this.#submitButton.textContent = this.#submitButtonText;
    }
  }
}

export default PopupWithForm;