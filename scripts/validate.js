const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("modal__form-input_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("modal__error-message_active");
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("modal__form-input_error");
    errorElement.textContent = '';
    errorElement.classList.remove("modal__error-message_active");
  };

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

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add("modal__submit-button_disabled");
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove("modal__submit-button_disabled");
      buttonElement.removeAttribute("disabled", "");
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".modal__form-input"));
    const buttonElement = formElement.querySelector(".modal__submit-button");
    const formOverlayList = Array.from(document.querySelectorAll(".modal"));
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
      formOverlayList.forEach((formOverlay) => {
        formOverlay.addEventListener("click", () => {
            formOverlay.classList.remove("modal_is-opened");
        });
        formOverlay.addEventListener("keydown", (evt) => {
            console.log(evt.key, "keydown");
            //if (evt.target === "Escape")
        });
    });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".modal__form"));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
        setEventListeners(formElement);
      });
  };
  
  enableValidation();