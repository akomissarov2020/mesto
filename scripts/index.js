const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const popupImageView = document.querySelector(".popup_type_view");

const nameInput = document.querySelector("[name='edit-profile-name']");
const titleInput = document.querySelector("[name='edit-profile-title']");

function initPopup(popup, onSubmit=false, resetForm=false) {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", () => {
    closePopup(popup, resetForm=resetForm);
  });
  if (onSubmit) {
    const formElement = popup.querySelector(".form");
    formElement.addEventListener('submit', onSubmit);
  }
}

const createPlace = (item) => {
  const placeTemplate = document.querySelector("#place").content;
  const placeItem = placeTemplate.querySelector(".elements__element").cloneNode(true);
  const image = placeItem.querySelector(".elements__image");
  const text = placeItem.querySelector(".elements__text");
  const likeButton = placeItem.querySelector(".elements__like");
  image.alt = item.name;
  image.src = item.link;
  text.textContent = item.name;
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__like_active");
  });

  placeItem.querySelector(".elements__trash-button").addEventListener("click", (evt) => {
    evt.target.closest(".elements__element").remove();
  });

  placeItem.querySelector(".elements__image").addEventListener("click", (evt) => {
    const element = evt.target.closest(".elements__element");
    const imageTitle = element.querySelector(".elements__title").textContent.trim();
    const popup = document.querySelector(".popup_type_view");
    const image = popup.querySelector(".popup__image");
    const text = popup.querySelector(".popup__image-text");
    image.src =  evt.target.src;
    text.textContent = imageTitle;
    openPopup(popup);
  });
  return placeItem;
}

const addPlace = (item) => {
  const placeItem = createPlace(item);
  document.querySelector(".elements").append(placeItem);
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup, resetForm=false) {
  popup.classList.remove("popup_opened");
  if (resetForm) {
    const form = popup.querySelector(".form");
    form.reset();
  }
}

function openEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent.trim();
  titleInput.value = profileTitle.textContent.trim();
}

function openAddPlace() {
  openPopup(popupAddPlace);
}

function submitPlaceAdding(event) {
  event.preventDefault();
  const form = event.target.closest(".form");
  const placeName = form.querySelector("[name='add-place-name']");
  const placeLink = form.querySelector("[name='add-place-link']");
  const item = {
    'name': placeName.value.trim(),
    'link': placeLink.value.trim()
  };
  const placeItem = createPlace(item);
  document.querySelector(".elements").prepend(placeItem);
  closePopup(popupAddPlace, resetForm=true);
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

initPopup(popupImageView);
initPopup(popupEditProfile, onSubmit=submitProfileEdit);
initPopup(popupAddPlace, onSubmit=submitPlaceAdding, resetForm=true);

editButton.addEventListener("click", openEditProfile);
addButton.addEventListener("click", openAddPlace);