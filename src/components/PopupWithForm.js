import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, formValidator, submitCallback) {
    super(popupSelector);
    this._submitButtonSelector = '.form__save-button';
    this._inactiveButtonClass = 'form__save-button_inactive';
    this._submitCallback = submitCallback;
    this._form = document.querySelector(popupSelector).querySelector('.form');
    this._formValidator = formValidator;
    this._formValidator.enableValidation();
  }

  open() {
    this._formValidator.toggleButtonState();
    super.open();
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
    this._close();
  }

  _close() {
    this._form.reset();
    this._formValidator.clearErrors();
    super._close();
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

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".form__field");
    this._formValues = {};
    this._inputList.forEach(item => {
      this._formValues[item.name] = item.value;
    });
    return this._formValues;
  }
}