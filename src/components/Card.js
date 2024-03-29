// Создание класса Card
class Card {
  #ownerId;
  #template;
  #cardImage;
  #buttonLike;
  #cardElement;
  #buttonTrash;
  #openDeletePopup;
  #handleCardClick;

  constructor (ownId, data, cardTemplate, handleCardClick, openDeletePopup, onLikeClick) {
    this.data = data;
    this.ownId = ownId;
    this.likes = this.data.likes;
    this.#ownerId = this.data.owner._id;
    this.#handleCardClick = handleCardClick; // коллбек открытия карточки
    this.#openDeletePopup = openDeletePopup; // коллбек открытия попапа удаления
    this.#template = cardTemplate;
    
    this.#cardElement = this.#template.cloneNode(true); // Клонируем данные темплейта
    this.#cardImage = this.#cardElement.querySelector(".elements-block__image"); // Блок  картинкой
    this.#buttonLike = this.#cardElement.querySelector(".elements-block__like-button"); // Кнопка лайка
    this.#buttonTrash = this.#cardElement.querySelector(".elements-block__delete-button"); // Мусор, удаление
    this.likesCounter = this.#cardElement.querySelector(".elements-block__like-count"); // Счётчик лайков

    this.handleLikeClick = this.handleLikeClick.bind(this)
    this.onLikeClick = onLikeClick; // Функция постановки и снятия лайков
  }

// Получаем данные карточки
  #getCardTemplate (data) {
    this.#cardElement.querySelector(".elements-block__name").textContent = data.name; // Содержимое текстового поля = передаваемой data.name
    this.#cardImage.src = data.link; // Содержимое ссылки = передаваемой data.link (Вроде как-то так)
    this.#cardImage.alt = data.name; // Содержимое alt берётся из передаваемого data.name

    this.#setEventListeners(this.#cardElement);
  }

// Создаём и возвращаем карточку из массива
  getCard(dataId) {
      this.#availabilityButtonDelete(dataId)
      this.#getCardTemplate(this.data)
      this.updateLikes(this.likes)
    return this.#cardElement;
  }

// Открытие попапа удаления карточки
  openPopupDelete = () => {
    this.#openDeletePopup(this)
  }

// Удаление карточки
  handleDeleteCard = () => {
    this.#cardElement.remove()
  }

// Доступность кнопки удаления
  #availabilityButtonDelete (dataId) {
    if (dataId.ownId !== this.#ownerId) {
      this.#buttonTrash.remove();
    }
  }

// Вызыв коллбека лайка
  handleLikeClick() {
    this.onLikeClick(this)
  }

// Обновление лайков
  updateLikes(likes) {
    this.likes = likes;
    this.isLiked = this.likes.some((like) => like._id === this.ownId);
    this.#buttonLike.classList.toggle('elements-block__like-button_active', this.isLiked);
    this.likesCounter.textContent = this.likes.length;
  }

// Обработчики событий
  #setEventListeners () {
    this.#buttonLike.addEventListener('click', this.handleLikeClick);
    this.#cardImage.addEventListener('click', this.#handleCardClick);
    this.#buttonTrash.addEventListener('click', this.openPopupDelete);
  }
}

export default Card;