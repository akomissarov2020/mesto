export default class Card {
  constructor(item, ownerId, templateSelector, handleCardClick, like, dislike, handleDeleteCard) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes.length;
    this._likesItems = item.likes;
    this._templateSelector = templateSelector;
    this._ownerId = ownerId;
    this._cardOwnerId = item.owner._id;
    this._id = item._id;
    // external methods
    this._externalLikeHandler = like;
    this._externalDisikeHandler = dislike;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _deleteImage(evt) {
    this._handleDeleteCard(this._id, this);
  }

  deleteImage() {
    this.placeItem.querySelector(".elements__like").removeEventListener("click", this._toggleLike);
    this.placeItem.querySelector(".elements__trash-button").removeEventListener("click", this._deleteImage);
    this.placeItem.querySelector(".elements__image").removeEventListener("click", this._handleCardClick);
    this.placeItem.remove();
    this.placeItem = null;
  }

  _toggleLike(evt) {
    if (evt.target.classList.contains('elements__like_active')) {
      this._externalDisikeHandler(this._id);
      this._likes -= 1;
    } else {
      this._likes += 1;
      this._externalLikeHandler(this._id);
    }
    this.setCardLikes(this._likes)
    evt.target.classList.toggle("elements__like_active");
  };

  _addEventListeners(placeItem) {
    this._likeButton.addEventListener("click", this._toggleLike.bind(this));
    placeItem.querySelector(".elements__trash-button").addEventListener("click", this._deleteImage.bind(this));
    placeItem.querySelector(".elements__image").addEventListener("click", this._handleCardClick);
  }

  createPlace() {
    const placeTemplate = document.querySelector(this._templateSelector).content;
    this.placeItem = placeTemplate.querySelector(".elements__element").cloneNode(true);
    const image = this.placeItem.querySelector(".elements__image");
    const text = this.placeItem.querySelector(".elements__text");
    image.alt = this._name;
    image.src = this._link;
    text.textContent = this._name;
    this._likesElement = this.placeItem.querySelector(".elements__like-count");
    this._likeButton = this.placeItem.querySelector('.elements__like');
    this._removeButton = this.placeItem.querySelector('.elements__trash-button');
    this.setCardLikes(this._likes);
    this._checkOwnLike();
    this._checkMyCard();
    this._addEventListeners(this.placeItem);
    return this.placeItem;
  };

  _checkOwnLike() {
    const found = this._likesItems.some(like => like._id === this._ownerId);
    found ? this._likeButton.classList.add('elements__like_active') : this._likeButton.classList.remove('elements__like_active');
  }


  setCardLikes(n) {
    this._likesElement.textContent = n;
  }

  _checkMyCard() {
    if (this._cardOwnerId !== this._ownerId) {
      this._hideRemoveButton();
    }
  }

  _hideRemoveButton() {
    this._removeButton.classList.add('elements__trash-button_inactive');
  }
}