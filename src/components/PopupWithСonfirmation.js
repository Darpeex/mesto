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
  }

  open(submitDelete) {
    super.open()
    this._submitCallback = submitDelete;
  }
}

export default PopupWithСonfirmation;