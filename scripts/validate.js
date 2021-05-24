const showInputError = (formElement, inputElement, errorMessage, invalidClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(invalidClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, invalidClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(invalidClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, invalidClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, invalidClass);
  } else {
    hideInputError(formElement, inputElement, invalidClass);
  }
};

const setEventListeners = (formElement, formSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
  const buttonElement = formElement.querySelector(formSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formSettings.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, formSettings.inactiveButtonClass);
      checkInputValidity(formElement, inputElement, formSettings.inputErrorClass);
    });
  });
};

const enableValidation = (formSettings) => {
  const formList = Array.from(document.querySelectorAll(formSettings.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, formSettings);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveClass);
  } else {
    buttonElement.classList.remove(inactiveClass);
  }
};