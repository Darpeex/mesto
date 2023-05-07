import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
  // Новые комментарии после сдачи спринта пишу
  constructor(popup, handleSubmitForm) {
    super(popup);
    this.#formElement = this.#popup.querySelector('.popup__form');
    this.#formInput = this.#formElement.querySelectorAll('.popup__input');
    this.#handleSubmitForm = handleSubmitForm;
  }

  #getInputValues() {
    const formValues = {};
    this.#formInput.forEach(input => {
      formValues[input.name] = input.value;
    })
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#formElement.addEventListener('submit', (evt) => { 
      evt.preventDefault();
      this.#handleSubmitForm(this.#getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this.#formElement.reset();
  }
}

export default PopupWithForm;