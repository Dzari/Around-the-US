import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
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

//User Info on Load

const initialUserInfo = {
  name: document.querySelector("#profile-name"),
  job: document.querySelector("#profile-subtitle"),
};

//***************************************************************************************************************************//
//                                                 Functions                                                                 //
//***************************************************************************************************************************//

const createCard = (cardData, method = "append") => {
  const cardTemplate = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = cardTemplate.getCardElement();

  cardSection.addItem(cardElement, method);
};

//***************************************************************************************************************************//
//                                             Event Listeners                                                               //
//***************************************************************************************************************************//

editProfileMOB.addEventListener("click", () => {
  editProfilePopup.open();
});

addCardMOB.addEventListener("click", () => {
  addPlacePopup.open();
});

//***************************************************************************************************************************//
//                                             Event Handlers                                                                //
//***************************************************************************************************************************//

function handleEditProfile(userData) {
  console.log(userData);
  userInfo.setUserInfo(userData);
  editProfilePopup._popupForm.reset();
  editProfilePopup.close();
}

function handleAddCardSubmit(cardData) {
  createCard(cardData, "prepend");
  addPlacePopup._popupForm.reset();
  addPlacePopup.close();
}

const handleImageClick = (cardData) => {
  maxImagePopup.open(cardData);
};

//***************************************************************************************************************************//
//                                                     Objects                                                               //
//***************************************************************************************************************************//

const cardSection = new Section(initialCards, createCard, "#cards-list");
const maxImagePopup = new PopupWithImage("#max-image-modal");
const editProfilePopup = new PopupWithForm(
  "#edit-profile-modal",
  handleEditProfile
);
const addPlacePopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
const userInfo = new UserInfo(initialUserInfo);

//***************************************************************************************************************************//
//                                             Validation and Rendering                                                      //
//***************************************************************************************************************************//

[...document.querySelectorAll(formSelector)].forEach((formElement) => {
  const form = new FormValidator(config, formElement);
  form.enableValidation();
  form.toggleButtonState();
});

cardSection.renderItems();
maxImagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addPlacePopup.setEventListeners();
