import Popup from './Popup.js'

class PopupWithForm extends Popup {
  #submitCallback;
  #formElement;
  
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.#submitCallback = submitCallback;
    this.#formElement = popupSelector.querySelector('.popup__editForm');
  }

  #getInputValues() {
    const inputs = Array.from(this.#formElement.querySelectorAll('.popup__form-input'));
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#submitCallback(this.#getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this.#formElement.addEventListener('submit', this.#submitHandler);
  }

  close() {
    super.close();
    this.#formElement.reset();
  }
}

export default PopupWithForm;