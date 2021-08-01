import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  
  constructor(popupSelector) {
    super(popupSelector);
    super._setEventListeners();
  }

  open(id, card) {
    super.open();
    this._id = id;
    this._card = card;
    this._popup.addEventListener('submit', this._deleteCard);
  }

  _deleteCard(evt) {
      evt.preventDefault();
      this._card.deleteImage();
  }

  close(evt) {
    super.close(evt);
    this._popup.removeEventListener('submit', this._deleteCard);
  }
}