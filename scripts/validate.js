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

const cleanValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__field'));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
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