import Popup from './Popup.js'

class PopupWithImage extends Popup {
  #openCard;
  #popupImage;
  #popupSubtitle;

  constructor(openCard) {
    super(openCard);
    this.#openCard = document.querySelector(openCard);
    this.#popupImage = this.#openCard.querySelector('.popup__image-card');
    this.#popupSubtitle = this.#openCard.querySelector('.popup__image-subtitle');
  }

  // Открытие попапа с картинкой
  open({ name, link }) {
    console.log(this.#popupImage.src)
    console.log(this.#popupSubtitle.textContent)
    this.#popupImage.src = link;
    this.#popupImage.alt = name;
    this.#popupSubtitle.textContent = name;
    
    super.open();
  }
}

export default PopupWithImage;