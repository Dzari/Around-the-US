import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupwithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";

const { formSelector } = config;

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

//Object Consts

//***************************************************************************************************************************//
//                                                 Functions                                                                 //
//***************************************************************************************************************************//

const handleImageClick = (cardData) => {
  maxImagePopup.open(cardData);
};

editProfileMOB.addEventListener("click", () => {
  editProfilePopup.open();
});

addCardMOB.addEventListener("click", () => {
  addPlacePopup.open();
});

// function handleEscape(evt) {
//   if (evt.key === "Escape") {
//     const openModal = document.querySelector(".modal_is-opened");
//     closeModal(openModal);
//   }
// }

const createCard = (cardData, method = "append") => {
  const cardTemplate = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = cardTemplate.getCardElement();

  cardsList[method](cardElement);
};

//***************************************************************************************************************************//
//                                             Event Handlers                                                                //
//***************************************************************************************************************************//

// function closeModal(modal) {
//   modal.classList.remove("modal_is-opened");
//   document.removeEventListener("keydown", handleEscape);
// }

// function openModal(modal) {
//   modal.classList.add("modal_is-opened");
//   document.addEventListener("keydown", handleEscape);
// }

function handleEditProfileSubmit([name, subtitle]) {
  profileName.textContent = name.value;
  profileSubtitle.textContent = subtitle.value;
  this.close();
}

function handleAddCardSubmit([title, titleLink]) {
  const cardData = {
    name: title.value,
    link: titleLink.value,
  };
  createCard(cardData, "prepend");
  this.close();
}

//***************************************************************************************************************************//
//                                             Event Listeners                                                               //
//***************************************************************************************************************************//

// //Open Buttons
// editProfileMOB.addEventListener("click", () => {
//   editProfileNamePlaceholder.value = profileName.textContent;
//   editProfileSubtitlePlaceholder.value = profileSubtitle.textContent;
//   openModal(editProfileModal);
// });

// addCardMOB.addEventListener("click", () => {
//   openModal(addCardModal);
// });

// //Submit Buttons

// editProfileModalForm.addEventListener("submit", handleEditProfileSubmit);
// addCardModalForm.addEventListener("submit", handleAddCardSubmit);

// //Close Button

// modalCloseButtons.forEach((closeButton) => {
//   closeButton.addEventListener("click", (evt) => {
//     closeModal(evt.target.closest(".modal"));
//   });
// });

// //Modal Click to close listeners

// modals.forEach((modal) => {
//   modal.addEventListener("click", (evt) => {
//     if (evt.target === evt.currentTarget) {
//       closeModal(modal);
//     }
//   });
// });

//***************************************************************************************************************************//
//                                                     ELEMENTS                                                              //
//***************************************************************************************************************************//

const cardSection = new Section(initialCards, createCard, "#cards-list");
const maxImagePopup = new PopupWithImage("#max-image-modal", handleImageClick);
const editProfilePopup = new PopupWithForm(
  "#edit-profile-modal",
  handleEditProfileSubmit
);
const addPlacePopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
const userInfo = new UserInfo();

//***************************************************************************************************************************//
//                                             Initial Functions                                                             //
//***************************************************************************************************************************//

// initialCards.forEach((cardData) => {
//   createCard(cardData);
// });

[...document.querySelectorAll(formSelector)].forEach((formElement) => {
  const form = new FormValidator(config, formElement);
  form.enableValidation();
  form.toggleButtonState();
});

cardSection.renderItems();
maxImagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addPlacePopup.setEventListeners();
