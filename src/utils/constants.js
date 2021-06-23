const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileNameSelector = ".profile__name";
const profileTitleSelector = ".profile__title";

const popupTitle = document.querySelector(".popup__image-text");
const popupImage = document.querySelector(".popup__image");

const popupEditProfileSelector = ".popup_type_edit-profile";
const popupAddPlaceSelector = ".popup_type_add-place";
const popupImageViewSelector = ".popup_type_view";

const nameInput = document.querySelector("[name='edit-profile-name']");
const titleInput = document.querySelector("[name='edit-profile-title']");

const formSettings = {
        inputSelector: '.form__field',
        submitButtonSelector: '.form__save-button',
        inactiveButtonClass: 'form__save-button_inactive',
        inputErrorClass: 'form__field_invalid'
      };

export {editButton, 
        addButton,
        profileNameSelector,
        profileTitleSelector,
        popupEditProfileSelector,
        popupAddPlaceSelector,
        popupImageViewSelector,
        nameInput,
        titleInput,
        popupTitle,
        popupImage,
        formSettings};