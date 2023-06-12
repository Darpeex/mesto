// Класс взаимодействия с сервером
class Api {
  #url;
  #token;

  constructor(data) {
    this.#url = data.url; // ссылка на сервер
    this.#token = data.headers.authorization; // токен
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
      headers: {
        authorization: this.#token
      }
    })
    .then(this.#handleResponse)
  }

  // Запрос карточек с сервера
  getCards() {
    return fetch(`${this.#url}/cards`, {
      headers: {
        authorization: this.#token
      }
    })
    .then(this.#handleResponse)
  }

  // Редактирование профиля
  editProfile(data) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.#token,
        'Content-type': 'application/json' // Указывает на то, что данные в теле запроса представлены в формате JSON
      },
      body: JSON.stringify({
        name: data.name, // имя
        about: data.about // о себе
      })
    })
    .then(this.#handleResponse)
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.#token,
        'Content-type': 'application/json'
      },
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
      headers: {
        authorization: this.#token
      }
    })
    .then(this.#handleResponse)
  }

  // Запрос на добавление лайка
  addCardLike(data) {
    return fetch(`${this.#url}/cards/likes/${data}`, {
      method: 'PUT',
      headers: {
        authorization: this.#token
      },
    })
    .then(this.#handleResponse)
  }

  // Запрос на удаление лайка
  removeCardLike(data) {
    return fetch(`${this.#url}/cards/likes/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: this.#token
      },
    })
    .then(this.#handleResponse)
  }
  
  // Обновление аватара пользователя
  editAvatar(data) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: PATCH,
      headers: {
        authorization: this.#token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this.#handleResponse)
  }
}

export default Api;