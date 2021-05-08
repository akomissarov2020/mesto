const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const savePopupButton = document.querySelector(".popup__save-button");

const nameInput = document.querySelector("[name='edit-profile-name']");
const titleInput = document.querySelector("[name='edit-profile-title']");

const createPlace = (item) => {
  const placeTemplate = document.querySelector("#place").content;
  const placeItem = placeTemplate.querySelector(".elements__element").cloneNode(true);
  placeItem.querySelector(".elements__text").textContent = item.name;
  placeItem.querySelector(".elements__image").alt = item.name;
  placeItem.querySelector(".elements__image").src = item.link;

  placeItem.querySelector(".elements__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__like_active");
  });

  placeItem.querySelector(".elements__trash-button").addEventListener("click", (evt) => {
    evt.target.closest(".elements__element").remove();
  });

  placeItem.querySelector(".elements__image").addEventListener("click", (evt) => {
    const imageSrc = evt.target.src;
    const element = evt.target.closest(".elements__element");
    const popup = document.querySelector(".popup_type_view");
    popup.querySelector(".popup__image").src = imageSrc;;
    const imageTitle = element.querySelector(".elements__title").textContent.trim();
    popup.querySelector(".popup__image-text").textContent = imageTitle;
    popup.classList.add("popup_opened");
    const closeButton = popup.querySelector(".popup__close-button");
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
  popup.classList.add("popup_opened");
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
    popup.classList.add("popup_closed");
  });
  const formElement = popup.querySelector(".form");
  formElement.addEventListener('submit', onSubmit);
}

function openEditProfile() {
  openPopup(popupEditProfile, submitProfileEdit);
  const name = profileName.textContent.trim();
  const title = profileTitle.textContent.trim();
  nameInput.value = name;
  titleInput.value = title;
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
  const name = nameInput.value.trim();
  const title = titleInput.value.trim();
  profileName.textContent = name;
  profileTitle.textContent = title;
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