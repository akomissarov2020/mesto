import Popup from "./Popup.js";
import {popupTitle, popupImage} from "../utils/constants.js";

export default class PopupWithImage extends Popup {

  open(evt) {
    const element = evt.target.closest(".elements__element");
    const imageElement = element.querySelector(".elements__image");
    const imageTitle = element.querySelector(".elements__title").textContent.trim();
    popupImage.src = imageElement.src;
    popupImage.alt = imageTitle;
    popupTitle.textContent = imageTitle;
    super.open();
  }
}