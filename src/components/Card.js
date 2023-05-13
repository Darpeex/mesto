// Создание класса Card
class Card {
  #container;
  #data;
  #cardElement;
  #cardImage;
  #template;
  #handleCardClick;

  constructor (containerSelector, data, cardTemplate, handleCardClick) { 
    this.#container = containerSelector; // #elements
    this.#data = data;
    this.#template = cardTemplate;
    this.#handleCardClick = handleCardClick;
  }

// Получаем данные карточки
  #getCardTemplate (data) {
    this.#cardElement = this.#template.cloneNode(true); // Клонируем данные темплейта
    this.#cardImage = this.#cardElement.querySelector(".elements-block__image"); // Блок  картинкой

    // console.log(data.name);
    
    this.#cardElement.querySelector(".elements-block__name").textContent = data.name; // Содержимое текстового поля = передаваемой data.name
    this.#cardImage.src = data.link; // Содержимое ссылки = передаваемой data.link (Вроде как-то так)
    this.#cardImage.alt = data.name; // Содержимое alt берётся из передаваемого data.name

    this.#setEventListeners(this.#cardElement);
  }

// Создаём и возвращаем карточку из массива
  getCard() {
      this.#getCardTemplate(this.#data)
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

// Обработчики событий
  #setEventListeners (cardElement) {
    cardElement.querySelector(".elements-block__delete-button").addEventListener('click', this.#handleDelete);
    cardElement.querySelector(".elements-block__like-button").addEventListener('click', this.#toggleLike);
    this.#cardImage.addEventListener('click', this.#handleCardClick); // ()
  }
}

export default Card;