import PopupWithForm from "../components/PopupWithForm.js";

class PopupWithСonfirmation extends PopupWithForm {
  #submitButton;
  _submitCallback;
  #popup;
  #form;

  constructor(popup) {
    super(popup);
    console.log(popup)
    this._submitCallback = null;
    // this.#popup = document.querySelector(popup);
    // this.#form = this.#popup.querySelector('.popup__confirationPopup');
    // this.#submitButton = this.#popup.querySelector('.popup__button_action_delete');
  }

  // _submitDeleteButton(evt) {
  //   console.log('delete')
  //   evt.preventDefault();
  //   this.#submitDelete();
  //   super.close()
  // }

  open(submitDelete) {
    super.open()
    this._submitCallback = submitDelete;
  }

  // setEventListeners() {
  //   super.setEventListeners();
  //   this.#form.addEventListener('submit', (evt) => {
  //     evt.preventDefault();
  //     this.#submitCallback();
  //   })
  //   // this.#form.addEventListener('submit', () =>  {this._submitDeleteButton()});
  //   // this.#form.addEventListener('submit', () => {console.log('кнопка нажата')});
  // }
}

export default PopupWithСonfirmation;