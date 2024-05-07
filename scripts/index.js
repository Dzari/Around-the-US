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

//***************************************************************************************************************************//
//                                                     ELEMENTS                                                              //
//***************************************************************************************************************************//

//Button Elements

const editProfileMOB = document.querySelector(
  "#edit-profile-modal-open-button"
);
const addCardMOB = document.querySelector("#add-card-modal-open-button");

const modalCloseButtons = document.querySelectorAll(".modal__close-button");

//maxImageMOB added to every card

const editProfileSubmitButton = document.querySelector(
  "#edit-profile-modal-submit-button"
);
const addCardSubmitButton = document.querySelector(
  "#add-card-modal-submit-button"
);

//Modal Elements

const modals = Array.from(document.querySelectorAll(".modal"));
const editProfileModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const maxImageModal = document.querySelector("#max-image-modal");

//Template
const cardTemplate = document.querySelector("#card-template").content;
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
//                                             Initial Functions                                                             //
//***************************************************************************************************************************//

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  cardsList.append(cardElement);
});

//***************************************************************************************************************************//
//                                                 Functions                                                                 //
//***************************************************************************************************************************//

function getCardElement(data) {
  //Cloning
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector("#card-like");
  const deletebutton = cardElement.querySelector("#card-delete");

  //Assigning data to new clone
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  cardImage.src = data.link;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like_liked");
  });

  deletebutton.addEventListener("click", () => {
    const deleteCard = deletebutton.closest(".card");
    deleteCard.remove();
  });

  cardImage.addEventListener("click", () => {
    maxImage.src = cardImage.src;
    maxImage.alt = cardImage.alt;
    maxImageTitle.textContent = cardTitle.textContent;
    openModal(maxImageModal);
  });

  return cardElement;
}

function escapetoClose(evt) {
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
  document.removeEventListener("keydown", escapetoClose);
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  document.addEventListener("keydown", escapetoClose);
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
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);

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

modalCloseButtons.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
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
