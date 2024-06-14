export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleConfirmDelete,
    handleLike
  ) {
    this.data = data;
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
      this._handleConfirmDelete(this.data);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this.data);
    });
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    this._likeCounter = this._cardElement.querySelector("#card-like-counter");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._card = this._cardElement.querySelector(".card");

    //Assigning data to new clone
    this._cardTitle.textContent = this.data.name;
    this._card.id = this.data._id;
    this._cardImage.alt = this.data.name;
    this._cardImage.src = this.data.link;

    this._setEventListeners();

    return this._cardElement;
  }

  _handleCardLike() {
    if (this._likeCounter.textContent === "1") {
      this._handleLike(this, "DELETE");
    } else {
      this._handleLike(this, "PUT");
    }
  }

  renderLikes(likedValue = this._isLiked) {
    this._isLiked = likedValue;
    if (!this._isLiked) {
      this._likeCounter.textContent = "0";
      this._likeButton.classList.remove("card__like_liked");
    } else {
      this._likeCounter.textContent = "1";
      this._likeButton.classList.add("card__like_liked");
    }
  }
}
