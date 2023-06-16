import Popup from './Popup.js'

class PopupWithImage extends Popup {
  #popupImage;
  #popupSelector;
  #popupSubtitle;

  constructor(popupSelector) {
    super(popupSelector);
    this.#popupSelector = document.querySelector(popupSelector);
    this.#popupImage = this.#popupSelector.querySelector('.popup__image-card');
    this.#popupSubtitle = this.#popupSelector.querySelector('.popup__image-subtitle');
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