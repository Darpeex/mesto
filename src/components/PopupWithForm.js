import Popup from './Popup.js'

class PopupWithForm extends Popup {
  #submitCallback;
  #formElement;
  #inputs;
  
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this.#submitCallback = submitCallback;
    this.#formElement = document.querySelector(popupSelector).querySelector('.popup__form');
    this.#inputs = Array.from(this.#formElement.querySelectorAll('.popup__form-input'));
    console.log(this.#inputs)
  }

  #getInputValues() {
    console.log( "ОК2")
    const values = {};
    this.#inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    console.log( "ОК1")
    this.#submitCallback(this.#getInputValues());
    console.log( "ОК3")
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