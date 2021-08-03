const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileNameSelector = ".profile__name";
const profileTitleSelector = ".profile__title";
const profileAvatarSelector = ".profile__avatar";

const popupEditProfileSelector = ".popup_type_edit-profile";
const popupAddPlaceSelector = ".popup_type_add-place";
const popupImageViewSelector = ".popup_type_view";
const popupEditAvatarSelector = ".popup_type_edit-avatar";
const PopupWithConfirmSelector = ".popup_type_with-confirm";

const nameInput = document.querySelector("[name='edit-profile-name']");
const titleInput = document.querySelector("[name='edit-profile-title']");


const addPlaceForm = document.querySelector("[name='add-place']");
const editProfileForm = document.querySelector("[name='edit-profile']");
const editAvatarForm = document.querySelector("[name='edit-avatar']");

const elementsSelector = ".elements";
const nameFieldName = "edit-profile-name";
const titleFieldName = "edit-profile-title";
const placeNameFieldName = "add-place-name";
const placeLinkFieldName = "add-place-link";
const avatarUrlFieldName = "avatar-link";

const placeTemplateSelector = "#place";

const avatarButton = document.querySelector(".profile__edit-avatar-button");

const formSettings = {
        inputSelector: '.form__field',
        submitButtonSelector: '.form__save-button',
        inactiveButtonClass: 'form__save-button_inactive',
        inputErrorClass: 'form__field_invalid'
      };

export {editButton, 
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
        addPlaceForm,
        editProfileForm,
        editAvatarForm,
        elementsSelector,
        nameInput,
        titleInput,
        formSettings};