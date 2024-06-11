//Imported Classes

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupwithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { config } from "../utils/constants.js";

//API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6730a6b1-094e-484e-b754-6ed1376cdeb2",
    "Content-Type": "application/json",
  },
});

//Popup Classes
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

//User Info Class
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__subtitle",
});

//Form Validator Class
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

//Open Buttons

const editProfileMOB = document.querySelector(
  "#edit-profile-modal-open-button"
);
const addCardMOB = document.querySelector("#add-card-modal-open-button");
const profilePic = document.querySelector("#profile-photo");

//Form Placeholders
const userNameInput = document.querySelector("#edit-profile-name-placeholder");
const userJobInput = document.querySelector(
  "#edit-profile-subtitle-placeholder"
);

//User Info
const profileName = document.querySelector("#profile-name");
const profileAbout = document.querySelector("#profile-subtitle");

//Modals
const editProfilePicModal = document.querySelector("#edit-pic-modal");
const addCardModal = document.querySelector("#add-card-modal");
const editProfileModal = document.querySelector("#edit-profile-modal");

//Popups
const popups = [
  maxImagePopup,
  editProfilePopup,
  addPlacePopup,
  profilePicPopup,
  confirmDeletePopup,
];

//Form Validators
const formValidators = [
  editProfileFormValidator,
  addPlaceFormValidator,
  profilePicFormValidator,
];

//Card Container
let cardSection;

//***************************************************************************************************************************//
//                                                 Functions                                                                 //
//***************************************************************************************************************************//

//Creates new Cards
function addNewCard(cardData, method = "append") {
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
}

//Sets Profile Picture
async function setProfilePic() {
  try {
    const data = await api.getUserInfo();
    profilePic.src = data.avatar;
  } catch (err) {
    console.log(err);
  }
}

//Sets event Listeners
function setEventListeners(popups) {
  popups.forEach((popup) => {
    popup.setEventListeners();
  });
}

//Sets Form validation
function setFormValidation(formValidators) {
  formValidators.forEach((formValidator) => {
    formValidator.enableValidation();
    formValidator.toggleButtonState();
  });
}

//Fetches then sets User Info
async function setUserInfo() {
  try {
    const userInfo = await api.getUserInfo();
    profileName.textContent = userInfo.name;
    profileAbout.textContent = userInfo.about;
    setProfilePic();
  } catch (err) {
    console.log(err);
  }
}

//Fetches then sets Initial Cards
async function setInitialCards() {
  try {
    const cards = await api.getInitialCards();
    cardSection = new Section(cards, addNewCard, "#cards-list");
    cardSection.renderItems();
  } catch (err) {
    console.log(err);
  }
}

//***************************************************************************************************************************//
//                                             Event Listeners                                                               //
//***************************************************************************************************************************//

//Prepares form then opens profile edit modal
editProfileMOB.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  userNameInput.value = user.name;
  userJobInput.value = user.job;

  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
});

//Opens new Card Modal
addCardMOB.addEventListener("click", () => {
  addPlacePopup.open();
});

//Opens profile picture edit modal
profilePic.addEventListener("click", () => {
  profilePicPopup.open();
});

//Opens max image Modal
const handleImageClick = (cardData) => {
  maxImagePopup.open(cardData);
};

//***************************************************************************************************************************//
//                                             Event Handlers                                                                //
//***************************************************************************************************************************//

//Handles profile edit submit
function handleEditProfile(userData) {
  const submitButton = editProfileModal.querySelector(
    "#edit-profile-modal-submit-button"
  );
  submitButton.textContent = "Saving...";

  api
    .patchProfileInfo(userData.name, userData.job)
    .then((res) => {
      userInfo.setUserInfo(res);
      editProfilePopup.popupForm.reset();
      editProfileFormValidator.toggleButtonState();
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = "Save";
    });
}

//Handles new card submit
function handleAddCardSubmit(cardData) {
  const submitButton = addCardModal.querySelector(
    "#add-card-modal-submit-button"
  );
  submitButton.textContent = "Saving...";

  api
    .addNewCard(cardData)
    .then((res) => {
      addNewCard(res, "prepend");
      addPlacePopup.popupForm.reset();
      addPlaceFormValidator.toggleButtonState();
      addPlacePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = "Create";
    });
}

//Handles card deletion
let cardtoDeleteData;

//Handles confirm delete and sets delete data
function handleConfirmDelete(data) {
  confirmDeletePopup.open();
  cardtoDeleteData = data;
}

//Deletes card
async function handleDeleteCard() {
  try {
    api.deleteCard(cardtoDeleteData._id);
    const card = document.querySelector(`li[id='${cardtoDeleteData._id}'`);
    card.remove();
  } catch (err) {
    console.log(err);
  } finally {
    confirmDeletePopup.close();
  }
}

//Changes Profile Picture
async function handleEditPicSubmit({ link }) {
  const submitButton = editProfilePicModal.querySelector(
    "#edit-pic-modal-submit-button"
  );
  submitButton.textContent = "Saving...";

  try {
    api.changeProfilePicture(link);
  } catch (err) {
    console.log(err);
  } finally {
    profilePic.src = link;
    profilePicPopup.close();
    submitButton.textContent = "Save";
  }
}

//Handles card Like
async function handleLikeCard(cardId, method) {
  const card = document.querySelector(`li[id='${cardId}'`);
  const cardLike = card.querySelector("#card-like");
  const cardLikeCounter = card.querySelector("#card-like-counter");
  try {
    if (method === "PUT") {
      api.likeCard(cardId, method);
      cardLikeCounter.textContent = "1";
      cardLike.classList.add("card__like_liked");
    } else {
      api.removeLike(cardId, method);
      cardLikeCounter.textContent = "0";
      cardLike.classList.remove("card__like_liked");
    }
  } catch (err) {
    console.log(err);
  }
}

//***************************************************************************************************************************//
//                                             Initial Functions                                                             //
//***************************************************************************************************************************//

setUserInfo();
setInitialCards();
setEventListeners(popups);
setFormValidation(formValidators);
