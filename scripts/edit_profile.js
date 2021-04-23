let editButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");

let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close-button");
let savePopupButton = document.querySelector(".popup__save-button");
let nameInput = document.querySelector(".popup__name-field");
let titleInput = document.querySelector(".popup__title-field");

editButton.addEventListener("click", function(){
  popup.setAttribute("style", "display:flex");
  let name = profileName.textContent.trim();
  let title = profileTitle.textContent.trim();
  nameInput.setAttribute("value", name);
  titleInput.setAttribute("value", title);
});

savePopupButton.addEventListener("click", function(){
  let name = nameInput.value.trim();
  let title = titleInput.value.trim();
  profileName.textContent = name;
  profileTitle.textContent = title;
  popup.setAttribute("style", "display:none");
});

nameInput.addEventListener("keyup", function(event){
  if (event.keyCode === 13) {
    let name = nameInput.value.trim();
    let title = titleInput.value.trim();
    profileName.textContent = name;
    profileTitle.textContent = title;
  }
});

titleInput.addEventListener("keyup", function(event){
  if (event.keyCode === 13) {
    let name = nameInput.value.trim();
    let title = titleInput.value.trim();
    profileName.textContent = name;
    profileTitle.textContent = title;
  }
});

closePopupButton.addEventListener("click", function(){
  popup.setAttribute("style", "display:none");
});
