class Section {
  #renderedItems;
  #container;
  #renderer;
  // Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. 
  // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
  // Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
  constructor({ items, renderer }, selector) {
    this.#renderedItems = items;
    this.#renderer = renderer;
    
    this.#container = selector;
  }

  // Метод, который отвечает за отрисовку всех элементов. 
  renderItems() {
    this.#renderedItems.forEach(item => this.#renderer(item))
  }

  // Метод, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this.#container.prepend(element);
  }
}

export default Section;