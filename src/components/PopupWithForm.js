import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, formValidator, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll(".form__field");
    this._saveButton = this._form.querySelector(".form__save-button");
    this._saveButtonDefaultText = this._saveButton.textContent;
    this._formValidator = formValidator;
    this._formValidator.enableValidation();
  }

  open() {
    this._formValidator.toggleButtonState();
    super.open();
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this._setLoadingStatus("loading");
    this._submitCallback(this._getInputValues())
    .then(res => {
      this.close();
    })
    .catch(err => {
      console.log(err);
      this._setLoadingStatus("error");
    })
    .finally(res => {
      this._setLoadingStatus("default");
    });
  }

  close() {
    this._form.reset();
    this._formValidator.clearErrors();
    this._setLoadingStatus("default");
    super.close();
  }

  _setEventListeners() {
    this._onSubmitBinding = this._onSubmit.bind(this);
    this._form.addEventListener("submit", this._onSubmitBinding);
    super._setEventListeners();
  }

  _removeEventListeners() {
    this._form.removeEventListener("submit", this._onSubmitBinding);
    super._removeEventListeners();
  }

  _setLoadingStatus(status) {
    if (status === "loading") {
      this._saveButton.textContent = "Сохранение...";
    } else if (status === "default") {
      this._saveButton.textContent = this._saveButtonDefaultText;
    } else {
      this._saveButton.textContent = "Ошибка";
    }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(item => {
      this._formValues[item.name] = item.value;
    });
    return this._formValues;
  }
}