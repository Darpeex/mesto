class Popup {
  #popup;
  #closeButton;

  // Принимает в конструктор единственный параметр — селектор попапа.
  constructor(popup) {
    this.#popup = document.querySelector(popup); // модальное окно 
    this._handleEscClose = this._handleEscClose.bind(this); // явная привязка
    this.#closeButton = this.#popup.querySelector('.popup__button_action_close'); // крестик
  }

  // Открытие попапов
  open() {
    this.#popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапов
  close() {
    this.#popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрытие попапа клавишей Esc.
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this.#popup.addEventListener('mousedown', (evt) => { 
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    
    this.#closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}

export default Popup; 