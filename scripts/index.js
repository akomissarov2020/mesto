const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");

let popupEditProfile = document.querySelector(".popup_type_edit-profile");
let popupAddPlace = document.querySelector(".popup_type_add-place");
let savePopupButton = document.querySelector(".popup__save-button");

let nameInput = document.querySelector("[name='edit-profile-name']");
let titleInput = document.querySelector("[name='edit-profile-title']");

const createPlace = (item) => {
  let placeTemplate = document.querySelector("#place").content;
  let placeItem = placeTemplate.querySelector(".elements__element").cloneNode(true);
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
    let imageSrc = evt.target.src;
    let element = evt.target.closest(".elements__element");
    let popup = document.querySelector(".popup_type_view");
    popup.querySelector(".popup__image").src = imageSrc;;
    let imageTitle = element.querySelector(".elements__title").textContent.trim();
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
  let name = profileName.textContent.trim();
  let title = profileTitle.textContent.trim();
  nameInput.value = name;
  titleInput.value = title;
}

function openAddPlace() {
  openPopup(popupAddPlace, submitPlaceAdding);
}

function submitPlaceAdding(event) {
  event.preventDefault();
  let form = event.target.closest(".form");
  let placeName = form.querySelector("[name='add-place-name']");
  let placeLink = form.querySelector("[name='add-place-link']");
  let item = {
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
  let name = nameInput.value.trim();
  let title = titleInput.value.trim();
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