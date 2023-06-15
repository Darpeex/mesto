import PopupWithForm from "../components/PopupWithForm.js";

class PopupWithСonfirmation extends PopupWithForm {
  _submitCallback;

  constructor(popup) {
    super(popup);
    this._submitCallback = null;
  }

  open(submitDelete) {
    super.open()
    this._submitCallback = submitDelete;
  }
}

export default PopupWithСonfirmation;