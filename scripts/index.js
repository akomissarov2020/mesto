const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddPlace = document.querySelector(".popup_type_add-place");

const nameInput = document.querySelector("[name='edit-profile-name']");
const titleInput = document.querySelector("[name='edit-profile-title']");

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
    const popup = document.querySelector(".popup_type_view");
    const closeButton = popup.querySelector(".popup__close-button");
    const imageTitle = element.querySelector(".elements__title").textContent.trim();
    const image = popup.querySelector(".popup__image");
    const text = popup.querySelector(".popup__image-text");
    image.src =  evt.target.src;
    text.textContent = imageTitle;
    popup.classList.add("popup_opened");
    closeButton.addEventListener("click", () => {
      popup.classList.remove("popup_opened");
      popup.classList.add("popup_closed");
    });
  });
  return placeItem;
}

const addPlace = (item) => {
  const placeItem = createPlace(item);
  document.querySelector(".elements").append(placeItem);
};

function openPopup(popup, onSubmit) {
  const closeButton = popup.querySelector(".popup__close-button");
  const formElement = popup.querySelector(".form");
  popup.classList.add("popup_opened");
  closeButton.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
    popup.classList.add("popup_closed");
  });
  formElement.addEventListener('submit', onSubmit);
}

function openEditProfile() {
  openPopup(popupEditProfile, submitProfileEdit);
  nameInput.value = profileName.textContent.trim();
  titleInput.value = profileTitle.textContent.trim();
}

function openAddPlace() {
  openPopup(popupAddPlace, submitPlaceAdding);
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
  popupAddPlace.classList.remove("popup_opened");
  popupAddPlace.classList.add("popup_closed");
  form.reset();
}

function updateProfile() {
  profileName.textContent = nameInput.value.trim();
  profileTitle.textContent = titleInput.value.trim();
}

function submitProfileEdit(event) {
    event.preventDefault();
    updateProfile();
    popupEditProfile.classList.remove("popup_opened");
    popupEditProfile.classList.add("popup_closed"); 
}

initialCards.forEach(addPlace);

editButton.addEventListener("click", openEditProfile);
addButton.addEventListener("click", openAddPlace);

document.addEventListener('animationstart', function (evt) {
  if (evt.animationName === 'fadeinanimation') {
      evt.target.classList.add('popup_opened');
  }
});
document.addEventListener('animationend', function (evt) {
  if (evt.animationName === 'fadeoutanimation') {
      evt.target.classList.remove('popup_closed');
   }
});