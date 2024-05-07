//***************************************************************************************************************************//
//                                                     Variables                                                             //
//***************************************************************************************************************************//

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error-message_active",
};

//***************************************************************************************************************************//
//                                             Initial Functions                                                             //
//***************************************************************************************************************************//

//Creates and activates validation on forms and modals

const enableValidation = (config) => {
  const { formSelector } = config;
  const formList = [...document.querySelectorAll(formSelector)];
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

//***************************************************************************************************************************//
//                                             Event Handlers                                                                //
//***************************************************************************************************************************//

//Error Handling on Form elements

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const { inputErrorClass } = config;
  const { errorClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const { inputErrorClass } = config;
  const { errorClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};
//Handles button elements - if error is found, button is inactive

const toggleButtonState = (inputList, buttonElement, config) => {
  const { inactiveButtonClass } = config;

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "");
  }
};

//Verifies validity of inputs in Forms and sends results to Error Handling functions

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//***************************************************************************************************************************//
//                                             Event Listeners                                                               //
//***************************************************************************************************************************//

//Sets event listeners for form inputs and submit buttons

const setEventListeners = (formElement, config) => {
  const { inputSelector } = config;
  const { submitButtonSelector } = config;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//***************************************************************************************************************************//
//                                                 Functions                                                                 //
//***************************************************************************************************************************//

enableValidation(config);
