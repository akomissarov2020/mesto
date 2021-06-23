import "./index.css";
import {initialCards} from "../utils/cards_data.js";
import Card from "../components/Cards.js";
import {editButton, 
      addButton,
      profileNameSelector,
      profileTitleSelector,
      popupEditProfileSelector,
      popupAddPlaceSelector,
      popupImageViewSelector,
      nameInput,
      titleInput} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

function submitProfileEdit(data) {
  userInfo.setUserInfo({name: data["edit-profile-name"], info: data["edit-profile-title"]});
  nameInput.value = data["edit-profile-name"];
  titleInput.value = data["edit-profile-title"];
}

function submitPlaceAdding(data) {
  const item = {
    'name': data["add-place-name"],
    'link': data["add-place-link"]
  };
  const card = new Card(item, "#place", popupImageView.open.bind(popupImageView));
  const placeItem = card.createPlace();
  section.prependItem(placeItem);
}

function openEditProfile(evt) {
  const {name, info} = userInfo.getUserInfo();
  nameInput.value = name;
  titleInput.value = info;
  popupEditProfile.open().bind(this);
}

const popupImageView = new PopupWithImage(popupImageViewSelector);
const section = new Section({items: initialCards, renderer: (item)=>{
  const card = new Card(item, "#place", popupImageView.open.bind(popupImageView));
  const placeItem = card.createPlace();
  section.addItem(placeItem);
}}, ".elements");
section.renderItems();

const userInfo = new UserInfo({nameSelector: profileNameSelector, infoSelector: profileTitleSelector});
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, submitProfileEdit);
editButton.addEventListener("click", openEditProfile.bind(popupEditProfile));

const popupAddPlace = new PopupWithForm(popupAddPlaceSelector, submitPlaceAdding);
addButton.addEventListener("click", popupAddPlace.open.bind(popupAddPlace));