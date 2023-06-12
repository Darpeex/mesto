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
      body: JSON.stringify(data) // name: data.name; link: data.link
    })
    .then(this.#handleResponse)
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this.#url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.#headers
    })
    .then(this.#handleResponse)
  }

  // Запрос на добавление лайка
  addCardLike(id) {
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.#headers
    })
    .then(this.#handleResponse)
  }

  // Запрос на удаление лайка
  removeCardLike(id) {
    return fetch(`${this.#url}/cards/${id}/likes`, {
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