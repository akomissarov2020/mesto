const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileNameSelector = ".profile__name";
const profileTitleSelector = ".profile__title";

const popupEditProfileSelector = ".popup_type_edit-profile";
const popupAddPlaceSelector = ".popup_type_add-place";
const popupImageViewSelector = ".popup_type_view";

const nameInput = document.querySelector("[name='edit-profile-name']");
const titleInput = document.querySelector("[name='edit-profile-title']");


const addPlaceForm = document.querySelector("[name='add-place']");
const editProfileForm = document.querySelector("[name='edit-profile']");

const elementsSelector = ".elements";
const nameFieldName = "edit-profile-name";
const titleFieldName = "edit-profile-title";
const placeNameFieldName = "add-place-name";
const placeLinkFieldName = "add-place-link";

const placeTemplateSelector = "#place";

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
        profileNameSelector,
        profileTitleSelector,
        popupEditProfileSelector,
        popupAddPlaceSelector,
        popupImageViewSelector,
        addPlaceForm,
        editProfileForm,
        elementsSelector,
        nameInput,
        titleInput,
        formSettings};