import "./index.css";
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
      titleInput} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";

function submitProfileEdit(data) {
  return new Promise(function(resolve, reject) {
    const name = data[nameFieldName];
    const info = data[titleFieldName]; 
    api.updateUserInfo({name: name, info: info})
    .then((res) => {
      userInfo.setUserInfo(res);
      resolve(res);
    })
    .catch((err) => {
      reject(err)
    });
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
  return new Promise(function(resolve, reject) {
    const link = data[avatarUrlFieldName];
    api.updateAvatar({link: link})
    .then((res) => {
      userInfo.setUserInfo(res);
      resolve(res);
    })
    .catch((err) => {
      reject(err)
    });
  });
}

function createCard(data) {
  const card = new Card(data, 
    ownerId, 
    placeTemplateSelector, 
    popupImageView.open.bind(popupImageView),
    likeHandler, 
    dislikeHandler, 
    handleDeleteCard);
  const placeItem = card.createPlace();
  return placeItem;
}

function addCard(item) {
  return new Promise(function(resolve, reject) {
    api.insertNewCard(item)
    .then(data => {
      const placeItem = createCard(data);
      section.prependItem(placeItem);
      resolve(data);
    })
    .catch((err) => {
      reject(err)
    });
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
  userInfo.setUserInfo(data);
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
      const placeItem = createCard(card);
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
  return new Promise(function(resolve, reject) {
    api.deletePhoto(id)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err)
    });
  });
}

function handleDeleteCard(id, card) {
  popupWithConfirm.open(id, card, deleteCard);
}

const popupWithConfirm = new PopupWithConfirm(PopupWithConfirmSelector); 