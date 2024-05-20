export default class Section {
  constructor(items, renderer, classSelector) {
    this._data = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }

  renderItems() {
    this._data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
