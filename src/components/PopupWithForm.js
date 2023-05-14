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
      const submitHandler = (evt) => {
        evt.preventDefault();
        this.#submitCallback(this.#getInputValues());
        this.close();
      }
    this.#formElement.addEventListener('submit', submitHandler);
    this.#formElement.addEventListener('reset', () => {
      this.#formElement.removeEventListener('submit', submitHandler)
    });
  }

  close() {
    super.close();
    this.#formElement.reset();
  }
}

export default PopupWithForm;