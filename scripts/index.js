import {initialCards} from "./cards_data.js";
import {FormValidator} from "./FormValidator.js";
import {Card} from "./Cards.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const popupImageView = document.querySelector(".popup_type_view");

const imageInImageView = popupImageView.querySelector(".popup__image");
const textInImageView = popupImageView.querySelector(".popup__image-text");

const nameInput = document.querySelector("[name='edit-profile-name']");
const titleInput = document.querySelector("[name='edit-profile-title']");
const placeName = document.querySelector("[name='add-place-name']");
const placeLink = document.querySelector("[name='add-place-link']");

const closePopupByKey = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

const closePopupByClick = (evt) => {
  if (evt.target.classList.contains("popup") || 
      evt.target.classList.contains("popup__close-button")) {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  }
};

const openImage = (evt) => {
  const element = evt.target.closest(".elements__element");
  const imageTitle = element.querySelector(".elements__title").textContent.trim();
  imageInImageView.src = evt.target.src;
  imageInImageView.alt = evt.target.alt;
  textInImageView.textContent = imageTitle;
  openPopup(popupImageView);
};

const addPlace = (item) => {
  const card = new Card(item, "#place");
  const placeItem = card.createPlace();
  document.querySelector(".elements").append(placeItem);
};

function openPopup(popup) {
  popup.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupByKey);
  popup.classList.remove("popup_hidden");
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener('click', closePopupByClick);
  document.removeEventListener('keydown', closePopupByKey);
}

function toggleButton(formElement, disabled) {
  const buttonElement = formElement.querySelector(formSettings.submitButtonSelector);
  if (disabled) {
    buttonElement.classList.add(formSettings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formSettings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function openEditProfile() {
  const formElement = popupEditProfile.querySelector(".form");
  toggleButton(formElement, false);
  nameInput.value = profileName.textContent.trim();
  titleInput.value = profileTitle.textContent.trim();
  openPopupWithForm(popupEditProfile, submitProfileEdit);
}

function openAddPlace() {
  const formElement = popupAddPlace.querySelector(".form");
  formElement.reset();
  toggleButton(formElement, true);
  openPopupWithForm(popupAddPlace, submitPlaceAdding);
}

function submitPlaceAdding(event) {
  event.preventDefault();
  const form = event.target.closest(".form");
  const item = {
    'name': placeName.value.trim(),
    'link': placeLink.value.trim()
  };
  const card = new Card(item, "#place");
  const placeItem = card.createPlace();
  document.querySelector(".elements").prepend(placeItem);
  closePopup(popupAddPlace);
}

function submitProfileEdit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value.trim();
  profileTitle.textContent = titleInput.value.trim();
  closePopup(popupEditProfile);
}

function openPopupWithForm(popup, onSubmit) {
  const formElement = popup.querySelector(".form");
  cleanValidation(formElement);
  openPopup(popup);
  formElement.addEventListener('submit', onSubmit);
}

function cleanValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(formSettings.inputErrorClass);
    errorElement.textContent = '';
  });
};

initialCards.forEach(addPlace);
editButton.addEventListener("click", openEditProfile);
addButton.addEventListener("click", openAddPlace);

nameInput.value = profileName.textContent.trim();
titleInput.value = profileTitle.textContent.trim();

const formSettings = {
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__field_invalid'
};

const formList = Array.from(document.querySelectorAll('.form'));
formList.forEach((form) => {
  const formValidator = new FormValidator(formSettings, form);
  formValidator.enableValidation();
});

export {openImage, toggleButton};