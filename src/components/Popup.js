export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.remove("popup_hidden");
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  _closeWithoutSubmit(evt) {
    if (evt.target.classList.contains("popup") || 
      evt.target.classList.contains("popup__close-button")) {
        this.close();
    }
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    this._onCloseBinding = this._closeWithoutSubmit.bind(this);
    this._onEscCloseBinding = this._handleEscClose.bind(this);
    this._popup.addEventListener('click', this._onCloseBinding);
    document.addEventListener('keydown', this._onEscCloseBinding);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('click', this._onCloseBinding);
    document.removeEventListener('keydown', this._onEscCloseBinding);
  }
}