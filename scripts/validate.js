//***************************************************************************************************************************//
//                                             Initial Functions                                                             //
//***************************************************************************************************************************//

//Creates and activates validation on forms and modals

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

//***************************************************************************************************************************//
//                                             Event Handlers                                                                //
//***************************************************************************************************************************//

//Error Handling on Form elements

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("modal__form-input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__error-message_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("modal__form-input_error");
  errorElement.textContent = "";
  errorElement.classList.remove("modal__error-message_active");
};
//Handles button elements - if error is found, button is inactive

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__submit-button_disabled");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("modal__submit-button_disabled");
    buttonElement.removeAttribute("disabled", "");
  }
};

//Verifies validity of inputs in Forms and sends results to Error Handling functions

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
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

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".modal__form-input")
  );
  const buttonElement = formElement.querySelector(".modal__submit-button");
  const formOverlayList = Array.from(document.querySelectorAll(".modal"));
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
    formOverlayList.forEach((formOverlay) => {
      formOverlay.addEventListener("click", (evt) => {
        if (evt.target === evt.currentTarget) {
          formOverlay.classList.remove("modal_is-opened");
        }
      });
    });
  });
};

//Allows user to use ESC to close modals

document.addEventListener("keydown", (evt) => {
  const openModal = document.querySelector(".modal_is-opened");
  if (evt.key === "Escape") {
    openModal.classList.remove("modal_is-opened");
  }
});

//***************************************************************************************************************************//
//                                                 Functions                                                                 //
//***************************************************************************************************************************//

enableValidation();
