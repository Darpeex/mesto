import { openPopup } from '../utils/utils.js';

// Создание класса Card
class Card {
  #container;
  #data;
  #cardElement;
  #cardImage;
  #template;

  constructor (containerSelector, data, cardTemplate) { 
    this.#container = document.querySelector(containerSelector); // #elements
    this.#data = data;
    this.#template = cardTemplate;
  }

  #getCardTemplate (data) {
    this.#cardElement = this.#template.cloneNode(true);
    this.#cardImage = this.#cardElement.querySelector(".elements-block__image");
    this.#cardElement.querySelector(".elements-block__name").textContent = data.name;
    this.#cardImage.src = data.link; 
    this.#cardImage.alt = data.name;

    this.#setEventListeners(this.#cardElement);
  }

// Создаём и возвращаем карточку из массива
  getCard(data) {
      this.#getCardTemplate(data)
    return this.#cardElement;
  }

// Лайк карточки
  #toggleLike (evt) {
    evt.target.classList.toggle('elements-block__like-button_active');
  };
// Удаление карточки
  #handleDelete (evt) {
    const card = evt.target.closest('.elements-block');
    card.remove();
  }
// Открытие попапа с картинкой
  #openPopupCard (evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupSubtitle.textContent = evt.target.alt;
    openPopup(openCard);
  }


// Обработчики событий
  #setEventListeners (cardElement) {
    cardElement.querySelector(".elements-block__delete-button").addEventListener('click', this.#handleDelete);
    cardElement.querySelector(".elements-block__like-button").addEventListener('click', this.#toggleLike);
    cardElement.querySelector(".elements-block__image").addEventListener('click', this.#openPopupCard);
  }
}

export default Card;