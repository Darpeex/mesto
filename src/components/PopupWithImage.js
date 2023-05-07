import { Popup } from './Popup.js'

class PopupWithImage extends Popup {
  #popupImage = this.#popup.querySelector('.popup__image-card');
  #popupSubtitle = this.#popup.querySelector('.popup__image-subtitle');

  // Открытие попапа с картинкой
  open(popupImage, popupSubtitle) {
    this.#popupImage.src = popupImage;
    this.#popupImage.alt = popupSubtitle;
    this.#popupSubtitle.textContent = popupSubtitle;

    super.open();
  }
}

export default PopupWithImage;