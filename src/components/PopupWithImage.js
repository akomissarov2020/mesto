import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  open(evt) {
    const element = evt.target.closest(".elements__element");
    const imageElement = element.querySelector(".elements__image");
    const imageTitle = element.querySelector(".elements__title").textContent.trim();
    const popupTitle = this._popup.querySelector(".popup__image-text");
    const popupImage = this._popup.querySelector(".popup__image");
    popupImage.src = imageElement.src;
    popupImage.alt = imageTitle;
    popupTitle.textContent = imageTitle;
    super.open();
  }
}