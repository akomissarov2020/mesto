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
    this._openImageFunctionBunding = this._openImage.bind(this);
  }

  _deleteImage(evt) {
    this._handleDeleteCard(this._id, this);
  }

  deleteImage() {
    this._placeItem.remove();
    this._placeItem = null;
  }

  _toggleLike(evt) {
    if (evt.target.classList.contains('elements__like_active')) {
      this._externalDisikeHandler(this._id, this.setCardLikes.bind(this));
    } else {
      this._externalLikeHandler(this._id, this.setCardLikes.bind(this));
    }
  };

  _openImage(evt) {
    this._handleCardClick(this._name, this._link);
  }

  _addEventListeners() {
    this._likeButton.addEventListener("click", this._toggleLike.bind(this));
    this._placeItem.querySelector(".elements__trash-button").addEventListener("click", this._deleteImage.bind(this));
    this._placeItem.querySelector(".elements__image").addEventListener("click", this._openImageFunctionBunding);
  };

  createPlace() {
    const placeTemplate = document.querySelector(this._templateSelector).content;
    this._placeItem = placeTemplate.querySelector(".elements__element").cloneNode(true);
    const image = this._placeItem.querySelector(".elements__image");
    const text = this._placeItem.querySelector(".elements__text");
    image.alt = this._name;
    image.src = this._link;
    text.textContent = this._name;
    this._likesElement = this._placeItem.querySelector(".elements__like-count");
    this._likeButton = this._placeItem.querySelector('.elements__like');
    this._removeButton = this._placeItem.querySelector('.elements__trash-button');
    this.setCardLikes(this._likesItems);
    this._checkOwnLike();
    this._checkMyCard();
    this._addEventListeners();
    return this._placeItem;
  };

  _checkOwnLike() {
    const found = this._likesItems.some(like => like._id === this._ownerId);
    found ? this._likeButton.classList.add('elements__like_active') : this._likeButton.classList.remove('elements__like_active');
  }


  setCardLikes(likes) {
    this._likesItems = likes;
    this._likesElement.textContent = likes.length;
    this._checkOwnLike();
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