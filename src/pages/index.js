import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupwithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";

const { formSelector } = config;

//Button Elements

const editProfileMOB = document.querySelector("#edit-profile-modal-open-button");
const addCardMOB = document.querySelector("#add-card-modal-open-button");
const userNameInput = document.querySelector("#edit-profile-name-placeholder");
const userJobInput = document.querySelector("#edit-profile-subtitle-placeholder");


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
  const user = userInfo.getUserInfo();
  userNameInput.value = user.name;
  userJobInput.value = user.job;

  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
});

addCardMOB.addEventListener("click", () => {
  addPlacePopup.open();
});

//***************************************************************************************************************************//
//                                             Event Handlers                                                                //
//***************************************************************************************************************************//

function handleEditProfile(userData) {
  userInfo.setUserInfo(userData);
  editProfilePopup.popupForm.reset();
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.close();
}

function handleAddCardSubmit(cardData) {
  createCard(cardData, "prepend");
  addPlacePopup.popupForm.reset();
  addPlaceFormValidator.toggleButtonState();
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

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__subtitle",
});

//***************************************************************************************************************************//
//                                             Validation and Rendering                                                      //
//***************************************************************************************************************************//

const editProfileFormValidator = new FormValidator(config, editProfilePopup.popupForm);

const addPlaceFormValidator = new FormValidator(config, addPlacePopup.popupForm);

cardSection.renderItems();
maxImagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addPlacePopup.setEventListeners();
editProfileFormValidator.enableValidation();
editProfileFormValidator.toggleButtonState();
addPlaceFormValidator.enableValidation();
addPlaceFormValidator.toggleButtonState();
