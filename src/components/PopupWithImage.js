import Popup from './Popup.js'

class PopupWithImage extends Popup {
  #popup;
  #popupImage;
  #popupSubtitle;

  constructor() {
    super(popup);
    this.#popupImage = popup.querySelector('.popup__image-card');
    this.#popupSubtitle = popup.querySelector('.popup__image-subtitle');
  }

  // Открытие попапа с картинкой
  open({ name, link }) {
    this.#popupImage.src = link;
    this.#popupImage.alt = name;
    this.#popupSubtitle.textContent = name;
    super.open();
  }
}

export default PopupWithImage;