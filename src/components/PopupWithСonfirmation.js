import PopupWithForm from "./PopupWithForm.js";

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

  renderLoading(isLoading, text) {
    super.renderLoading(isLoading, text);
  }
}

export default PopupWithСonfirmation;