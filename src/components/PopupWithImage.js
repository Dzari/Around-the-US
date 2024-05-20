import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, handleOpen) {
    super(popupSelector);
    this._handleOpen = handleOpen;
    this._maxImage = this._popupElement.querySelector("#max-image");
    this._maxImageTitle = this._popupElement.querySelector("#max-image-title");
  }

  open(data) {
    this._maxImage.src = data.link;
    this._maxImage.alt = data.name;
    this._maxImageTitle.textContent = data.name;
    super.open();
  }
}
