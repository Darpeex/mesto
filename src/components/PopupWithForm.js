import Popup from './Popup.js'

class PopupWithForm extends Popup {
  #submitCallback;
  #formElement;
  
  constructor(popupSelector, submitCallback) {
    super(popup);
    this.#submitCallback = submitCallback;
    this.#formElement = popupSelector;
  }

  #getInputValues() {
    const inputs = Array.from(this.#formElement.querySelectorAll('.popup__form-input'));
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#submitCallback(this.#getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this.#formElement.reset();
  }
}

export default PopupWithForm;