let editButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");

let popup = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close-button");
let savePopupButton = document.querySelector(".popup__save-button");

let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__field[name=name]");
let titleInput = document.querySelector(".popup__field[name=title]");

editButton.addEventListener("click", function(){
  popup.setAttribute("style", "display:flex");
  let name = profileName.textContent.trim();
  let title = profileTitle.textContent.trim();
  nameInput.setAttribute("value", name);
  titleInput.setAttribute("value", title);
});

function updateProfile() {
  let name = nameInput.value.trim();
  let title = titleInput.value.trim();
  profileName.textContent = name;
  profileTitle.textContent = title;
}

// Нашел фрагмент кода в брифе, когда уже стал проверять,
// я не знал, что можно сделать по событию submit для формы сделать.
// Поэтому для каждого варианта события добавил отдельный обработчик.

// savePopupButton.addEventListener("click", function(){
//   updateProfile();
//   popup.setAttribute("style", "display:none");
// });

// nameInput.addEventListener("keyup", function(event){
//   if (event.keyCode === 13) {
//     updateProfile();
//   }
// });

// titleInput.addEventListener("keyup", function(event){
//   if (event.keyCode === 13) {
//     updateProfile();
//   }
// });

closePopupButton.addEventListener("click", function(){
  popup.setAttribute("style", "display:none");
});

formElement.addEventListener('submit', function(event){
    event.preventDefault();
    updateProfile();
    popup.setAttribute("style", "display:none");
});
