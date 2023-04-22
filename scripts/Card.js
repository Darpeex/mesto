import { openPopup, closePopup, createCard } from './index.js';

// Создание класса Card
class Card {
  #container;
  #data;
  #cardElement;
  #cardImage;
  #template = cardTemplate;

  constructor (containerSelector, data) { 
    this.#container = document.querySelector(containerSelector); // #elements
    this.#data = data;
  }

// Открыть попап добавления карточки
  #openPopupAddCard () {
    openPopup(popupAddCard);
  };

// Создаём и возвращаем карточку из массива
  getCard(data) {
    this.#cardElement = this.#template.cloneNode(true);
    this.#cardImage = this.#cardElement.querySelector(".elements-block__image");
    this.#cardElement.querySelector(".elements-block__name").textContent = data.name;
    this.#cardImage.src = data.link; 
    this.#cardImage.alt = data.name;
    this.#setEventListeners(this.#cardElement);
    return this.#cardElement;
  }

// Добавление новой карточки
  #renderCard = (evt) => {
    if (getCardName.value.length <= 1 || getSrcImg.value.length <= 1) {stop;}
    else {
      evt.preventDefault();
      // this.#data = {name: '.elements-block__name', link: '.elements-block__image'};
      this.#data.name = getCardName.value;
      this.#data.link = getSrcImg.value;
      createCard(data);
      creationForm.reset();
      closePopup(popupAddCard);}
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
    popupAddCardBtn.addEventListener('click', this.#openPopupAddCard);
    creationForm.addEventListener('submit', this.#renderCard);
  }
}

export default Card;