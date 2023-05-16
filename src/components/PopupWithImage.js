import Popup from './Popup.js'

class PopupWithImage extends Popup {
  #openCard;
  #popupImage;
  #popupSubtitle;

  constructor() {
    super(openCard);
    this.#openCard = openCard;
    this.#popupImage = this.#openCard.querySelector('.popup__image-card');
    this.#popupSubtitle = this.#openCard.querySelector('.popup__image-subtitle');
  }

  // Открытие попапа с картинкой
  open({ name, link }) {
    this.#popupImage.src = link;
    this.#popupImage.alt = name;
    this.#popupSubtitle.textContent = name;
    
    super.open();
    super.setEventListeners();
  }
}

export default PopupWithImage;