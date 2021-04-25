let editButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");

let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close-button");
let savePopupButton = document.querySelector(".popup__save-button");

let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector("[name='edit_profile__name']");
let titleInput = document.querySelector("[name='edit_profile__title']");

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
    popup.setAttribute("style", "display:none");
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", popupOpen);
closePopupButton.addEventListener("click", popupClose);
formElement.addEventListener('submit', submit);
