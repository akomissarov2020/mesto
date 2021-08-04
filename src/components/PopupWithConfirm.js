import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._deleteCardFunctionBunding = this._deleteCard.bind(this);
    this._saveButton = this._form.querySelector(".form__save-button");
    this._saveButtonDefaultText = this._saveButton.textContent;
  }

  open(id, card, apiCallback) {
    super.open();
    this._id = id;
    this._card = card;
    this._form.addEventListener('submit', this._deleteCardFunctionBunding);
    this._apiCallback = apiCallback;
  }

  _deleteCard(evt) {
      evt.preventDefault();
      this._setLoadingStatus("loading");
      this._apiCallback(this._id)
      .then((res)=>{
        this._card.deleteImage();  
        this.close();
      })
      .catch((err)=>{
        console.log(err);
        this._setLoadingStatus("error");
      })
      .finally(res => {
        this._setLoadingStatus("default");
      });
  }

  _setLoadingStatus(status) {
    if (status === "loading") {
      this._saveButton.textContent = "Удаление...";
    } else if (status === "default") {
      this._saveButton.textContent = this._saveButtonDefaultText;
    } else {
      this._saveButton.textContent = "Ошибка";
    }
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._deleteCardFunctionBunding);
    this._setLoadingStatus("default");
  }
}