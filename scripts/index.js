const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const popupImageView = document.querySelector(".popup_type_view");

const nameInput = document.querySelector("[name='edit-profile-name']");
const titleInput = document.querySelector("[name='edit-profile-title']");

const closePopupByKey = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

const closePopupByClick = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};

function initPopup(popup, onSubmit=false) {
  const closeButton = popup.querySelector(".popup__close-button");
  popup.classList.remove("popup_hidden");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
  if (onSubmit) {
    enableValidation(popup, onSubmit);
  } 
  popup.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupByKey);
}

const removePopupListeners = (popup) => {
  popup.removeEventListener('click', closePopupByClick);
  document.removeEventListener('keydown', closePopupByKey);
}

const toggleLike = (evt) => {
  evt.target.classList.toggle("elements__like_active");
};

const deleteImage = (evt) => {
  evt.target.closest(".elements__element").remove();
};

const openImage = (evt) => {
  const element = evt.target.closest(".elements__element");
  const imageTitle = element.querySelector(".elements__title").textContent.trim();
  const popup = document.querySelector(".popup_type_view");
  const image = popup.querySelector(".popup__image");
  const text = popup.querySelector(".popup__image-text");
  image.src =  evt.target.src;
  text.textContent = imageTitle;
  openPopup(popup);
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
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  const form = popup.querySelector(".form");
  if (form) {
    form.reset();
  }
}

function openEditProfile() {
  nameInput.value = profileName.textContent.trim();
  titleInput.value = profileTitle.textContent.trim();
  initPopup(popupEditProfile, onSubmit=submitProfileEdit);
  openPopup(popupEditProfile);
}

function openAddPlace() {
  initPopup(popupAddPlace, onSubmit=submitPlaceAdding);
  openPopup(popupAddPlace);
}

initialCards.forEach(addPlace);

initPopup(popupImageView);

editButton.addEventListener("click", openEditProfile);
addButton.addEventListener("click", openAddPlace);