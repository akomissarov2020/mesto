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
      avatarUrlFieldName,
      profileNameSelector,
      profileTitleSelector,
      profileAvatarSelector,
      avatarButton,
      popupEditProfileSelector,
      popupAddPlaceSelector,
      popupImageViewSelector,
      popupEditAvatarSelector,
      formSettings,
      addPlaceForm,
      editAvatarForm,
      editProfileForm,
      elementsSelector,
      nameInput,
      titleInput} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";

function submitProfileEdit(data) {
  const name = data[nameFieldName];
  const info = data[titleFieldName]; 
  userInfo.setUserInfo({name: name, info: info});
  nameInput.value = name;
  titleInput.value = info;

  api.updateUserInfo({name: name, info: info})
    .then((res) => {
      console.log(res);
    })
    .catch(res => console.log(res));
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

function editAvatar(evt) {
  popupEditAvatar.open();
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

function submitEditAvatar(data) {
  const link = data[avatarUrlFieldName];
  userInfo.setUserAvatar(link);
  api.updateAvatar({link: link})
    .then((res) => {
      console.log(res);
    })
    .catch(res => console.log(res));
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/',
  headers: {
    authorization: '05e586ce-c0c8-4f14-bbd3-b259a470e2b4',
    'Content-Type': 'application/json'
  }
});

let ownerId = null;

api.getUserInfo()
  .then((data) => {
    userInfo.initUser(data);
    ownerId = data._id;
  })
  .catch((err) => {
    console.log(err);
});


function like() {

}

function dislike() {

}

function handleDeleteCard() {

}

const section = new Section({items: [], renderer: (item)=>{
  addCard(item);
}}, elementsSelector);

api.getInitialCards()
  .then((initialCards) => { 
    console.log(initialCards);

    initialCards.forEach(card => {
      let cardItem = new Card(card, 
                            ownerId, 
                            placeTemplateSelector, 
                            popupImageView.open.bind(popupImageView),
                            like, 
                            dislike, 
                            handleDeleteCard);
      const placeItem = cardItem.createPlace();
      section.prependItem(placeItem);
    });
    
  })
  .catch((err) => {
    console.log(err);
});

section.renderItems();

const popupImageView = new PopupWithImage(popupImageViewSelector);

const userInfo = new UserInfo({nameSelector: profileNameSelector, 
                               infoSelector: profileTitleSelector, 
                               avatarSelector: profileAvatarSelector});
const formValidatorEditProfile = new FormValidator(formSettings, editProfileForm);
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, formValidatorEditProfile, submitProfileEdit);
editButton.addEventListener("click", openEditProfile);

const formValidatorAddPlace = new FormValidator(formSettings, addPlaceForm);
const popupAddPlace = new PopupWithForm(popupAddPlaceSelector, formValidatorAddPlace, submitPlaceAdding);
addButton.addEventListener("click", openAddPlace);

const formValidatorEditAvatar = new FormValidator(formSettings, editAvatarForm);
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, formValidatorEditAvatar, submitEditAvatar);
avatarButton.addEventListener("click", editAvatar);