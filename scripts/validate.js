const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('form__field_invalid');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('form__field_invalid');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__field'));
  const buttonElement = formElement.querySelector(".form__save-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = (popup, onSubmit) => {
  const formElement = popup.querySelector(".form");
  formElement.addEventListener('submit', onSubmit);
  setEventListeners(formElement);
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__save-button_inactive");
  } else {
    buttonElement.classList.remove("form__save-button_inactive");
  }
};

function submitPlaceAdding(event) {
  event.preventDefault();
  const form = event.target.closest(".form");
  const inputList = Array.from(form.querySelectorAll('.form__field'));
  if (hasInvalidInput(inputList)) {
    return
  }
  const placeName = form.querySelector("[name='add-place-name']");
  const placeLink = form.querySelector("[name='add-place-link']");
  const item = {
    'name': placeName.value.trim(),
    'link': placeLink.value.trim()
  };
  const placeItem = createPlace(item);
  document.querySelector(".elements").prepend(placeItem);
  form.reset();
  closePopup(popupAddPlace);
}

function updateProfile() {
  profileName.textContent = nameInput.value.trim();
  profileTitle.textContent = titleInput.value.trim();
}

function submitProfileEdit(event) {
  event.preventDefault();
  const form = event.target.closest(".form");
  const inputList = Array.from(form.querySelectorAll('.form__field'));
  if (hasInvalidInput(inputList)) {
    return
  }
  updateProfile();
  closePopup(popupEditProfile);
}
