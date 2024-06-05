export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleConfirmDelete,
    handleLike
  ) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleConfirmDelete = handleConfirmDelete;
    this._handleLike = handleLike;
    this._isLiked = data.isLiked;
  }

  _setEventListeners() {
    //Adding Like and delete event listeners

    this._likeButton = this._cardElement.querySelector("#card-like");
    this._deletebutton = this._cardElement.querySelector("#card-delete");

    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });

    this._deletebutton.addEventListener("click", () => {
      this._handleConfirmDelete(this._data);
    });

    this.cardImage.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    this._likeCounter = this._cardElement.querySelector("#card-like-counter");
    this.cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");

    //Assigning data to new clone
    cardTitle.textContent = this._data.name;
    this.cardImage.alt = this._data.name;
    this.cardImage.src = this._data.link;

    this._setEventListeners();

    return this._cardElement;
  }

  _handleCardLike() {
    this._likeButton.classList.toggle("card__like_liked");

    if (this._likeCounter.textContent === "1") {
      this._likeCounter.textContent = "0";
      this._handleLike(this._data._id, "DELETE");
    } else {
      this._likeCounter.textContent = "1";
      this._handleLike(this._data._id, "PUT");
    }
  }

  renderLikes() {
    if (!this._isLiked) {
      this._likeCounter.textContent = "0";
      this._likeButton.classList.remove("card__like_liked");
    } else {
      this._likeCounter.textContent = "1";
      this._likeButton.classList.add("card__like_liked");
    }
  }
}
