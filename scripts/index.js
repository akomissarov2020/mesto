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

const toggleLike = (evt) => {
  evt.target.classList.toggle("elements__like_active");
};

const openImage = (evt) => {
  const element = evt.target.closest(".elements__element");
  const imageTitle = element.querySelector(".elements__title").textContent.trim();
  imageInImageView.src = evt.target.src;
  imageInImageView.alt = evt.target.alt;
  textInImageView.textContent = imageTitle;
  openPopup(popupImageView);
};

const deleteImage = (evt) => {
  const placeItem = evt.target.closest(".elements__element");
  placeItem.querySelector(".elements__like").removeEventListener("click", toggleLike);
  placeItem.querySelector(".elements__trash-button").removeEventListener("click", deleteImage);
  placeItem.querySelector(".elements__image").removeEventListener("click", openImage);
  placeItem.remove();
};

const createPlace = (item) => {
  const placeTemplate = document.querySelector("#place").content;
  const placeItem = placeTemplate.querySelector(".elements__element").cloneNode(true);
  const image = placeItem.querySelector(".elements__image");
  const text = placeItem.querySelector(".elements__text");
  const likeButton = placeItem.querySelector(".elements__like");
  image.alt = item.name;
  image.src = item.link;
  text.textContent = item.name;
  likeButton.addEventListener("click", toggleLike);
  placeItem.querySelector(".elements__trash-button").addEventListener("click", deleteImage);
  placeItem.querySelector(".elements__image").addEventListener("click", openImage);
  return placeItem;
};

const addPlace = (item) => {
  const placeItem = createPlace(item);
  document.querySelector(".elements").append(placeItem);
};

function openPopup(popup) {
  const closeButton = popup.querySelector(".popup__close-button");
  popup.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupByKey);
  popup.classList.remove("popup_hidden");
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  const closeButton = popup.querySelector(".popup__close-button");
  popup.removeEventListener('click', closePopupByClick);
  document.removeEventListener('keydown', closePopupByKey);
}

function openEditProfile() {
  nameInput.value = profileName.textContent.trim();
  titleInput.value = profileTitle.textContent.trim();
  openPopupWithForm(popupEditProfile, onSubmit=submitProfileEdit);
}

function openAddPlace() {
  const form = popupAddPlace.querySelector(".form");
  form.reset();
  openPopupWithForm(popupAddPlace, onSubmit=submitPlaceAdding);
}

function openPopupWithForm(popup, onSubmit=undefined) {
  const formElement = popup.querySelector(".form");
  cleanValidation(formElement);
  openPopup(popup);
  formElement.addEventListener('submit', onSubmit);
}

const cleanValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__field'));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  const buttonElement = formElement.querySelector('.form__save-button');
  toggleButtonState(inputList, buttonElement, 'form__save-button_inactive');
};

function submitPlaceAdding(event) {
  event.preventDefault();
  const form = event.target.closest(".form");
  const item = {
    'name': placeName.value.trim(),
    'link': placeLink.value.trim()
  };
  const placeItem = createPlace(item);
  document.querySelector(".elements").prepend(placeItem);
  form.reset();
  closePopup(popupAddPlace);
}

function updateProfile() {
  profileName.textContent = nameInput.value.trim();
  profileTitle.textContent = titleInput.value.trim();
}

function submitProfileEdit(event) {
  event.preventDefault();
  updateProfile();
  closePopup(popupEditProfile);
}

initialCards.forEach(addPlace);
editButton.addEventListener("click", openEditProfile);
addButton.addEventListener("click", openAddPlace);

const formSettings = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__field_invalid'
};
enableValidation(formSettings);
