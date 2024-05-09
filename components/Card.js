export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this.cardImage.addEventListener("click", () => {
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

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    this.cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");

    //Assigning data to new clone
    cardTitle.textContent = this._data.name;
    this.cardImage.alt = this._data.name;
    this.cardImage.src = this._data.link;

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
