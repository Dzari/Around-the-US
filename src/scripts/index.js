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

//Edit Profile Elements

const profileName = document.querySelector("#profile-name");
const profileSubtitle = document.querySelector("#profile-subtitle");

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

const createCard = (cardData, method = "append") => {
  const cardTemplate = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = cardTemplate.getCardElement();

  cardSection.addItem(cardElement, method);
};

//***************************************************************************************************************************//
//                                             Event Handlers                                                                //
//***************************************************************************************************************************//

function handleEditProfile([name, subtitle]) {
  userInfo.setUserInfo(userInfo.getUserInfo());
  editProfilePopup._popupForm.reset();
  editProfilePopup.close();
}

function handleAddCardSubmit([title, titleLink]) {
  const cardData = {
    name: title.value,
    link: titleLink.value,
  };
  createCard(cardData, "prepend");
  addPlacePopup.close();
}

//***************************************************************************************************************************//
//                                                     ELEMENTS                                                              //
//***************************************************************************************************************************//

const cardSection = new Section(initialCards, createCard, "#cards-list");
const maxImagePopup = new PopupWithImage("#max-image-modal");
const editProfilePopup = new PopupWithForm(
  "#edit-profile-modal",
  handleEditProfile
);
const addPlacePopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
const userInfo = new UserInfo(profileName, profileSubtitle);

//***************************************************************************************************************************//
//                                             Initial Functions                                                             //
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
