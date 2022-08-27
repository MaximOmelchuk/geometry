export default class BaseComponent {

    constructor(parent, tag = 'div', classList = [], content = '', attributes = {}) {
      this.element = document.createElement(tag);
      parent.append(this.element);
      if (classList.length) {
        this.element.classList.add(...classList);
      }
      if (Object.entries(attributes).length) {
        Object.entries(attributes).forEach(([attr, value]) => this.element.setAttribute(attr, value));
      }
      this.element.textContent = content;
    }
  }