import "./index.css";
import {initialCards} from "../utils/cards_data.js";
import Card from "../components/Cards.js";
import {editButton, 
      addButton,
      placeTemplateSelector,
      nameFieldName,
      titleFieldName,
      placeNameFieldName,
      placeLinkFieldName,
      profileNameSelector,
      profileTitleSelector,
      popupEditProfileSelector,
      popupAddPlaceSelector,
      popupImageViewSelector,
      formSettings,
      addPlaceForm,
      editProfileForm,
      elementsSelector,
      nameInput,
      titleInput} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";


function submitProfileEdit(data) {
  userInfo.setUserInfo({name: data[nameFieldName], info: data[titleFieldName]});
  nameInput.value = data[nameFieldName];
  titleInput.value = data[titleFieldName];
}

function addCard(item) {
  const card = new Card(item, placeTemplateSelector, popupImageView.open.bind(popupImageView));
  const placeItem = card.createPlace();
  section.prependItem(placeItem);
}

function submitPlaceAdding(data) {
  const item = {
    'name': data[placeNameFieldName],
    'link': data[placeLinkFieldName]
  };
  addCard(item);
}

function openEditProfile(evt) {
  const {name, info} = userInfo.getUserInfo();
  nameInput.value = name;
  titleInput.value = info;
  popupEditProfile.open();
}

function openAddPlace(evt) {
  popupAddPlace.open();
}

const popupImageView = new PopupWithImage(popupImageViewSelector);
const section = new Section({items: initialCards, renderer: (item)=>{
  addCard(item);
}}, elementsSelector);
section.renderItems();

const userInfo = new UserInfo({nameSelector: profileNameSelector, infoSelector: profileTitleSelector});
const formValidatorEditProfile = new FormValidator(formSettings, editProfileForm);
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, formValidatorEditProfile, submitProfileEdit);
editButton.addEventListener("click", openEditProfile);

const formValidatorAddPlace = new FormValidator(formSettings, addPlaceForm);
const popupAddPlace = new PopupWithForm(popupAddPlaceSelector, formValidatorAddPlace, submitPlaceAdding);
addButton.addEventListener("click", openAddPlace);