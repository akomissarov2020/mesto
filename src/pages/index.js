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
      PopupWithConfirmSelector,
      formSettings,
      addPlaceForm,
      editAvatarForm,
      editProfileForm,
      elementsSelector,
      nameInput,
      saveButtonAvatar,
      saveButtonProfile,
      saveButtonPlace,
      titleInput} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";

function submitProfileEdit(data) {
  const name = data[nameFieldName];
  const info = data[titleFieldName]; 
  userInfo.setUserInfo({name: name, info: info});
  nameInput.value = name;
  titleInput.value = info;
  saveButtonProfile.textContent = "Cохранение...";
  api.updateUserInfo({name: name, info: info})
    .then((res) => {
      console.log(res);
    })
    .catch(res => console.log(res))
    .finally(res => {
      saveButtonProfile.textContent = "Сохранить";
    });
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

function submitEditAvatar(data) {
  const link = data[avatarUrlFieldName];
  userInfo.setUserAvatar(link);
  saveButtonAvatar.textContent = "Cохранение...";
  api.updateAvatar({link: link})
    .then((res) => {
      console.log(res);
    })
    .catch(res => console.log(res))
    .finally(res => {
      saveButtonAvatar.textContent = "Сохранить";
    });
}

function addCard(item) {
  saveButtonPlace.textContent = "Создание...";
  api.insertNewCard(item)
  .then(data => {
    console.log(data);
    const card = new Card(data, 
      ownerId, 
      placeTemplateSelector, 
      popupImageView.open.bind(popupImageView),
      likeHandler, 
      dislikeHandler, 
      handleDeleteCard);
    const placeItem = card.createPlace();
    section.prependItem(placeItem);
  })
  .catch(err => console.log(err))
  .finally(res => {
    saveButtonPlace.textContent = "Создать";
  });
}

function submitPlaceAdding(data) {
  const item = {
    'name': data[placeNameFieldName],
    'link': data[placeLinkFieldName]
  };
  addCard(item);
}

function openAddPlace(evt) {
  popupAddPlace.open();
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

function likeHandler(id, updateLikesCallback) {
  api.putLike(id)
  .then((res) => {
    updateLikesCallback(res.likes);
  })
  .catch((err) => {
    console.log(err);
  });
}

function dislikeHandler(id, updateLikesCallback) {
  api.deleteLike(id)
  .then((res) => {
    updateLikesCallback(res.likes);
  })
  .catch((err) => {
    console.log(err);
  });
}

const section = new Section({items: [], renderer: (item)=>{
  addCard(item);
}}, elementsSelector);

api.getInitialCards()
  .then((initialCards) => { 
    initialCards.forEach(card => {
      let cardItem = new Card(card, 
                            ownerId, 
                            placeTemplateSelector, 
                            popupImageView.open.bind(popupImageView),
                            likeHandler, 
                            dislikeHandler, 
                            handleDeleteCard);
      const placeItem = cardItem.createPlace();
      section.addItem(placeItem);
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


function deleteCard(id) {
  api.deletePhoto(id)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
}

function handleDeleteCard(id, card) {
  popupWithConfirm.open(id, card, deleteCard);
  
}

const popupWithConfirm = new PopupWithConfirm(PopupWithConfirmSelector); 