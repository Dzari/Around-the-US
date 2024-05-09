export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    //Adding Like and delete event listeners

    this._likeButton = this._cardElement.querySelector("#card-like");
    this._deletebutton = this._cardElement.querySelector("#card-delete");

    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });

    this._deletebutton.addEventListener("click", () => {
      this._handleCardDelete(this);
    });
  }

  getCardElement(data) {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");

    //Assigning data to new clone
    cardTitle.textContent = data.name;
    this._cardImage.alt = data.name;
    this._cardImage.src = data.link;

    this._setEventListeners();

    return this._cardElement;
  }

  _handleCardDelete() {
    const deleteCard = this._deletebutton.closest(".card");
    deleteCard.remove();
  }
  _handleCardLike() {
    this._likeButton.classList.toggle("card__like_liked");
  }
}
