// Создание класса Card
class Card {
  #container;
  #data;
  #cardElement;
  #buttonLike;
  #buttonTrash;
  #cardImage;
  #template;
  #handleCardClick;

  constructor (containerSelector, data, cardTemplate, handleCardClick) { 
    this.#container = containerSelector; // #elements
    this.#data = data;
    this.#template = cardTemplate;
    this.#handleCardClick = handleCardClick;
    
    this.#cardElement = this.#template.cloneNode(true); // Клонируем данные темплейта
    this.#cardImage = this.#cardElement.querySelector(".elements-block__image"); // Блок  картинкой
    this.#buttonLike = this.#cardElement.querySelector(".elements-block__like-button"); // Лайк
    this.#buttonTrash = this.#cardElement.querySelector(".elements-block__delete-button"); // Мусор
  }

// Получаем данные карточки
  #getCardTemplate (data) {
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
  #toggleLike () {
    this.#buttonLike.classList.toggle("elements-block__like-button_active");
  };
// Удаление карточки
  #handleDelete () {
    this.#cardElement.remove();
  }

// Обработчики событий
  #setEventListeners () {
    this.#buttonTrash.addEventListener('click', this.#handleDelete);
    this.#buttonLike.addEventListener('click', this.#toggleLike);
    this.#cardImage.addEventListener('click', this.#handleCardClick);
  }
}

export default Card;