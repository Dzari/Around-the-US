export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const { inputErrorClass } = this._config;
      const { errorClass } = this._config;
      const errorElement = this._form.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.add(inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(errorClass);
    } else {
      const { inputErrorClass } = this._config;
      const { errorClass } = this._config;
      const errorElement = this._form.querySelector(
        `#${inputElement.id}-error`
      );
      inputElement.classList.remove(inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(errorClass);
    }
  }

  enableValidation() {
    const { inputSelector, submitButtonSelector } = this._config;
    this._inputList = [...this._form.querySelectorAll(inputSelector)];
    this._buttonElement = this._form.querySelector(submitButtonSelector);
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }
  toggleButtonState() {
    const { inactiveButtonClass } = this._config;
    const hasInvalidInput = () => {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };

    if (hasInvalidInput()) {
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "");
    }
  }
}
