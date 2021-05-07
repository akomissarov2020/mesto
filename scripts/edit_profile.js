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
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");

let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close-button");
let savePopupButton = document.querySelector(".popup__save-button");

let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector("[name='edit-profile-name']");
let titleInput = document.querySelector("[name='edit-profile-title']");

function popupOpen() {
  popup.classList.add("popup_opened");
  let name = profileName.textContent.trim();
  let title = profileTitle.textContent.trim();
  nameInput.value = name;
  titleInput.value = title;
}

function updateProfile() {
  let name = nameInput.value.trim();
  let title = titleInput.value.trim();
  profileName.textContent = name;
  profileTitle.textContent = title;
}

function submit(event) {
    event.preventDefault();
    updateProfile();
    popup.classList.remove("popup_opened");
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", popupOpen);
closePopupButton.addEventListener("click", popupClose);
formElement.addEventListener('submit', submit);
