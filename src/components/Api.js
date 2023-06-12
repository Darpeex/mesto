// Класс взаимодействия с сервером
class Api {
  #url;
  #headers;

  constructor(data) {
    this.#url = data.url; // ссылка на сервер
    this.#headers = data.headers; // данные headers из index.js для запроса
  }

  // Проверка статуса запроса
  #handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this.#url}/users/me`, {
      headers: this.#headers
    })
    .then(this.#handleResponse)
  }

  // Запрос карточек с сервера
  getInitialCards() {
    return fetch(`${this.#url}/cards`, {
      headers: this.#headers
    })
    .then(this.#handleResponse)
  }

  // Редактирование профиля
  setUserInfo(userInfo) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,

      body: JSON.stringify({
        name: userInfo.name, // имя
        about: userInfo.about // о себе
      })
    })
    .then(this.#handleResponse)
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: this.#headers,

      body: JSON.stringify({
        name: data.name, // имя карточки
        link: data.link // ссылка на картинку
      })
    })
    .then(this.#handleResponse)
  }

  // Удаление карточки
  deleteCard(data) {
    return fetch(`${this.#url}/cards/${data}`, {
      method: 'DELETE',
      headers: this.#headers
    })
    .then(this.#handleResponse)
  }

  // Запрос на добавление лайка
  addCardLike(data) {
    return fetch(`${this.#url}/cards/likes/${data}`, {
      method: 'PUT',
      headers: this.#headers
    })
    .then(this.#handleResponse)
  }

  // Запрос на удаление лайка
  removeCardLike(data) {
    return fetch(`${this.#url}/cards/likes/${data}`, {
      method: 'DELETE',
      headers: this.#headers
    })
    .then(this.#handleResponse)
  }
  
  // Обновление аватара пользователя
  editAvatar(data) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: PATCH,
      headers: this.#headers,

      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this.#handleResponse)
  }
}

export default Api;