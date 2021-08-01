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
    this._like = like;
    this._dislike = dislike;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _deleteImage(evt) {
    let placeItem = evt.target.closest(".elements__element");
    placeItem.querySelector(".elements__like").removeEventListener("click", this._toggleLike);
    placeItem.querySelector(".elements__trash-button").removeEventListener("click", this._deleteImage);
    placeItem.querySelector(".elements__image").removeEventListener("click", this._handleCardClick);
    placeItem.remove();
    placeItem = null;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("elements__like_active");
  };

  _addEventListeners(placeItem) {
    const likeButton = placeItem.querySelector(".elements__like");
    likeButton.addEventListener("click", this._toggleLike);
    placeItem.querySelector(".elements__trash-button").addEventListener("click", this._deleteImage);
    placeItem.querySelector(".elements__image").addEventListener("click", this._handleCardClick);
  }

  createPlace() {
    const placeTemplate = document.querySelector(this._templateSelector).content;
    const placeItem = placeTemplate.querySelector(".elements__element").cloneNode(true);
    const image = placeItem.querySelector(".elements__image");
    const text = placeItem.querySelector(".elements__text");
    image.alt = this._name;
    image.src = this._link;
    text.textContent = this._name;
    this._addEventListeners(placeItem);
    return placeItem;
  };

  _hideRemoveButton() {
    
  }
}