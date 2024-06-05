import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupwithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { config } from "../utils/constants.js";

const { formSelector } = config;

//Button Elements

const editProfileMOB = document.querySelector(
  "#edit-profile-modal-open-button"
);
const addCardMOB = document.querySelector("#add-card-modal-open-button");
const userNameInput = document.querySelector("#edit-profile-name-placeholder");
const userJobInput = document.querySelector(
  "#edit-profile-subtitle-placeholder"
);
const profilePic = document.querySelector("#profile-photo");

const editProfilePicModal = document.querySelector("#edit-pic-modal");
const addCardModal = document.querySelector("#add-card-modal");
const editProfileModal = document.querySelector("#edit-profile-modal");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6730a6b1-094e-484e-b754-6ed1376cdeb2",
    "Content-Type": "application/json",
  },
});

const profileName = document.querySelector("#profile-name");
const profileAbout = document.querySelector("#profile-subtitle");

api.getUserInfo().then((userInfo) => {
  profileName.textContent = userInfo.name;
  profileAbout.textContent = userInfo.about;
});

let cardSection;

api.getInitialCards().then((cards) => {
  cardSection = new Section(cards, addNewCard, "#cards-list");
  cardSection.renderItems();
});

//***************************************************************************************************************************//
//                                                 Functions                                                                 //
//***************************************************************************************************************************//

const addNewCard = (cardData, method = "append") => {
  const cardTemplate = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleConfirmDelete,
    handleLikeCard
  );
  const cardElement = cardTemplate.getCardElement();
  cardTemplate.renderLikes();

  cardSection.addItem(cardElement, method);
};

async function setProfilePic() {
  const data = await api.getUserInfo();
  profilePic.src = data.avatar;
}

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

profilePic.addEventListener("click", () => {
  profilePicPopup.open();
});

//***************************************************************************************************************************//
//                                             Event Handlers                                                                //
//***************************************************************************************************************************//

function handleEditProfile(userData) {
  const submitButton = editProfileModal.querySelector(
    "#edit-profile-modal-submit-button"
  );
  submitButton.textContent = "Saving...";
  console.log(userData);
  api.patchProfileInfo(userData.name, userData.job);
  userInfo.setUserInfo(userData);
  editProfilePopup.popupForm.reset();
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.close();
  submitButton.textContent = "Save";
}

function handleAddCardSubmit(cardData) {
  const submitButton = addCardModal.querySelector(
    "#add-card-modal-submit-button"
  );
  submitButton.textContent = "Saving...";
  api.addNewCard(cardData);
  addNewCard(cardData, "prepend");
  addPlacePopup.popupForm.reset();
  addPlaceFormValidator.toggleButtonState();
  addPlacePopup.close();
  submitButton.textContent = "Create";
  api.getInitialCards();
}

let cardtoDeleteData;

function handleConfirmDelete(data) {
  confirmDeletePopup.open();
  cardtoDeleteData = data;
}

function handleDeleteCard() {
  api.deleteCard(cardtoDeleteData._id);
  const image = document.querySelector(`img[src='${cardtoDeleteData.link}'`);
  console.log(image);
  console.log(image.closest(".card"));
  const deleteCard = image.closest(".card");
  deleteCard.remove();
  confirmDeletePopup.close();
}

function handleEditPicSubmit({ link }) {
  const submitButton = editProfilePicModal.querySelector(
    "#edit-pic-modal-submit-button"
  );
  submitButton.textContent = "Saving...";
  api.changeProfilePicture(link);
  profilePic.src = link;
  profilePicPopup.close();
  submitButton.textContent = "Save";
}

const handleImageClick = (cardData) => {
  maxImagePopup.open(cardData);
};

function handleLikeCard(cardId, method) {
  if (method === "PUT") {
    api.likeCard(cardId, method);
  } else {
    api.removeLike(cardId, method);
  }
}

//***************************************************************************************************************************//
//                                                     Objects                                                               //
//***************************************************************************************************************************//

const maxImagePopup = new PopupWithImage("#max-image-modal");
const editProfilePopup = new PopupWithForm(
  "#edit-profile-modal",
  handleEditProfile
);
const addPlacePopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);

const profilePicPopup = new PopupWithForm(
  "#edit-pic-modal",
  handleEditPicSubmit
);

const confirmDeletePopup = new PopupWithForm(
  "#confirm-modal",
  handleDeleteCard
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__subtitle",
});

//***************************************************************************************************************************//
//                                             Validation and Rendering                                                      //
//***************************************************************************************************************************//

const editProfileFormValidator = new FormValidator(
  config,
  editProfilePopup.popupForm
);

const addPlaceFormValidator = new FormValidator(
  config,
  addPlacePopup.popupForm
);

const profilePicFormValidator = new FormValidator(
  config,
  profilePicPopup.popupForm
);

maxImagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addPlacePopup.setEventListeners();
profilePicPopup.setEventListeners();
confirmDeletePopup.setEventListeners();
editProfileFormValidator.enableValidation();
editProfileFormValidator.toggleButtonState();
addPlaceFormValidator.enableValidation();
addPlaceFormValidator.toggleButtonState();
profilePicFormValidator.enableValidation();
profilePicFormValidator.toggleButtonState();
setProfilePic();
