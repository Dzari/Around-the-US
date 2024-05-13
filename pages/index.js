import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error-message_active",
};

const { formSelector } = config;

//***************************************************************************************************************************//
//                                                     ELEMENTS                                                              //
//***************************************************************************************************************************//

//Button Elements

const editProfileMOB = document.querySelector(
  "#edit-profile-modal-open-button"
);
const addCardMOB = document.querySelector("#add-card-modal-open-button");

const modalCloseButtons = document.querySelectorAll(".modal__close-button");

//Modal Elements

const modals = Array.from(document.querySelectorAll(".modal"));
const editProfileModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const maxImageModal = document.querySelector("#max-image-modal");

//Template
const cardsList = document.querySelector("#cards-list");

//Edit Profile Elements

const profileName = document.querySelector("#profile-name");
const profileSubtitle = document.querySelector("#profile-subtitle");
const editProfileNamePlaceholder = document.querySelector(
  "#edit-profile-name-placeholder"
);
const editProfileSubtitlePlaceholder = document.querySelector(
  "#edit-profile-subtitle-placeholder"
);
const editProfileModalForm = document.querySelector("#edit-profile-modal-form");

//Add Card Elements

const addCardModalForm = document.querySelector("#add-card-modal-form");
const addCardTitle = document.querySelector("#add-card-title");
const addCardLink = document.querySelector("#add-card-image-link");

//Max Image Elements

const maxImage = document.querySelector("#max-image");
const maxImageTitle = document.querySelector("#max-image-title");

//***************************************************************************************************************************//
//                                                 Functions                                                                 //
//***************************************************************************************************************************//

const handleImageClick = (card) => {
  maxImage.src = card.cardImage.src;
  maxImage.alt = card.cardImage.alt;
  maxImageTitle.textContent = card.cardImage.alt;
  openModal(maxImageModal);
};

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    closeModal(openModal);
  }
}

//***************************************************************************************************************************//
//                                             Event Handlers                                                                //
//***************************************************************************************************************************//

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function handleEditProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = editProfileNamePlaceholder.value;
  profileSubtitle.textContent = editProfileSubtitlePlaceholder.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: addCardTitle.value,
    link: addCardLink.value,
  };
  createCard(cardData, "prepend");
  closeModal(addCardModal);
  e.target.reset();
}

//***************************************************************************************************************************//
//                                             Event Listeners                                                               //
//***************************************************************************************************************************//

//Open Buttons
editProfileMOB.addEventListener("click", () => {
  editProfileNamePlaceholder.value = profileName.textContent;
  editProfileSubtitlePlaceholder.value = profileSubtitle.textContent;
  openModal(editProfileModal);
});

addCardMOB.addEventListener("click", () => {
  openModal(addCardModal);
});

//Submit Buttons

editProfileModalForm.addEventListener("submit", handleEditProfileSubmit);
addCardModalForm.addEventListener("submit", handleAddCardSubmit);

//Close Button

modalCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", (evt) => {
    closeModal(evt.target.closest(".modal"));
  });
});

//Modal Click to close listeners

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(modal);
    }
  });
});

//***************************************************************************************************************************//
//                                             Initial Functions                                                             //
//***************************************************************************************************************************//

initialCards.forEach((cardData) => {
  createCard(cardData);
});

[...document.querySelectorAll(formSelector)].forEach((formElement) => {
  const form = new FormValidator(config, formElement);
  form.enableValidation();
  form.toggleButtonState();
});

function createCard(cardData, method = "append") {
  const cardTemplate = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = cardTemplate.getCardElement();

  cardsList[method](cardElement);
}
