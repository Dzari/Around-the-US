import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._formInputList = [
      ...this._popupForm.querySelectorAll(".modal__form-input"),
    ];
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    const formValues = {};
    this._formInputList.forEach((input) => {
      const { name, value } = input;
      formValues[name] = value;
    });

    return formValues;
  }
}
