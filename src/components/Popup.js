class Popup {
  #popup;
  #closeButtons;
  // #handleEscClose;

  // Принимает в конструктор единственный параметр — селектор попапа.
  constructor(popup) {
    this.#popup = document.querySelector(popup); // модальное окно
    // this.#handleEscClose = this.#handleEscClose.bind(this); // явная привязка
    this.#closeButtons = this.#popup.querySelector('.popup__button_action_close'); // крестики
  }

  // Открытие попапов
  open() {
    this.#popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#handleEscClose);
  }

  // Закрытие попапов
  close() {
    this.#popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#handleEscClose);
  }

  // Закрытие попапа клавишей Esc.
  #handleEscClose(evt) {
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

    this.#closeButtons.addEventListener('click', () => {
      this.close();
    });
  }
}

export default Popup;