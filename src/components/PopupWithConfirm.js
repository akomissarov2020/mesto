import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  
  constructor(popupSelector) {
    super(popupSelector);
    super._setEventListeners();
    this._form = document.querySelector(popupSelector).querySelector('.form');
  }

  open(id, card, api_callback) {
    super.open();
    this._id = id;
    this._card = card;
    this._form.addEventListener('submit', this._deleteCard.bind(this));
    this._api_callback = api_callback;
  }

  _deleteCard(evt) {
      evt.preventDefault();
      this._card.deleteImage();
      this._api_callback(this._id);
      this._close();
  }  

  close(evt) {
    if (evt.target.classList.contains("popup") || 
      evt.target.classList.contains("popup__close-button")) {
        super.close(evt);
        this._form.removeEventListener('submit', this._deleteCard.bind(this));
    }
  }
}