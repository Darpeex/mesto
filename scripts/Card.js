// Создание класса Card
class Card {
  #name;
  #link;
  #cardTemplate;

  constructor(data, cardTemplate) {
    this.#name = data.name;
    this.#link = data.link;
    this.#cardTemplate = cardTemplate;
  }

// Клонируем содержимое элемента
  #getTemplate() {
    const cardElement = document
      .querySelector(this.#cardTemplate)
      .content
      .querySelector('.elements')
      .cloneNode(true);
    return cardElement;
  }

// Устанавливаем слушатели
  #setEventListeners() {
    this.element.querySelector('.elements-block__like-button').addEventListener('click', () => {
      this.#handleLikeClick();
    });

    this.element.querySelector('.elements-block__delete-button').addEventListener('click', () => {
      this.#handleDeleteClick();
    });

    this.element.querySelector('.elements-block__image').addEventListener('click', () => {
      this.#openPopupCard();
    });
  }

// Лайк карточки
  #handleLikeClick() {
    this.element.querySelector('.elements-block__like-button').classList.toggle('elements-block__like-button_active');
  }

// Удаление карточки
  #handleDeleteClick() {
    this.element.remove();
  }

// Открытие попапа с картинкой
  #openPopupCard() {
    const popupImage = document.querySelector('.popup__image-card');
    const popupCaption = document.querySelector('.popup__image-subtitle');
    popupImage.src = this.#link;
    popupImage.alt = this.#name;
    popupCaption.textContent = this.#name;
    openPopup(openCard);
  }

// Создаём карточку
  generateCard() {
    this.element = this.#getTemplate();
    const cardImage = this.element.querySelector('.elements-block__image');
    const cardName = this.element.querySelector('.elements-block__name');
    cardImage.src = this.#link;
    cardImage.alt = this.#name;
    cardName.textContent = this.#name;
    this.#setEventListeners();
    return this.element;
  }
}

export default Card;