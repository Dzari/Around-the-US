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

const editProfileMOB = document.querySelector("#edit-profile-modal-open-button");
const addCardMOB = document.querySelector("#add-card-modal-open-button");
//maxImageMOB after Initilization

const closeButtons = document.querySelectorAll("#modal-close-button");

const editProfileSubmitButton = document.querySelector("#edit-profile-modal-submit-button");
const addCardSubmitButton = document.querySelector("#add-card-modal-submit-button");

//Modal Elements

const editProfileModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const maxImageModal = document.querySelector("#max-image-modal");

//Template
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector("#cards-list");

//Edit Profile Elements

const profileName = document.querySelector("#profile-name");
const profileSubtitle = document.querySelector("#profile-subtitle");
const editProfileNamePlaceholder = document.querySelector("#edit-profile-name-placeholder");
const editProfileSubtitlePlaceholder = document.querySelector("#edit-profile-subtitle-placeholder");
const editProfileModalForm = document.querySelector("#edit-profile-modal-form");

//Add Card Elements

const addCardModalForm = document.querySelector("#add-card-modal-form");
const addCardTitle = document.querySelector("#add-card-title");
const addCardLink = document.querySelector("#add-card-image-link");

//***************************************************************************************************************************//
//                                             Initial Functions                                                             //
//***************************************************************************************************************************//

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});

const maxImageMOBArray = document.querySelectorAll("#max-image-modal-open-button");


maxImageMOBArray.forEach((maxImageMOB) => {
  maxImageMOB.addEventListener("click", () => {
    const card = maxImageMOB.closest(".card");
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    const maxImage = maxImageModal.querySelector("#max-image");
    const maxImageTitle = maxImageModal.querySelector("#max-image-title");
    
    maxImage.src = cardImage.src;
    maxImage.alt = cardImage.alt;
    maxImageTitle.textContent = cardTitle.textContent;

    openModal(maxImageModal)
  });
});

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    closeModal(closeButton)
  });
})

//***************************************************************************************************************************//
//                                                 Functions                                                                 //
//***************************************************************************************************************************//

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector("#card-like");
  const deletebutton = cardElement.querySelector("#card-delete");


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


  return cardElement;
}

//***************************************************************************************************************************//
//                                             Event Handlers                                                                //
//***************************************************************************************************************************//

function closeModal(closeButton) {
  const modal = closeButton.closest(".modal");
  modal.classList.remove("modal_is-opened");
}

function openModal(modal){
  if (modal === editProfileModal) {
    modal.classList.add("modal_is-opened");
    editProfileNamePlaceholder.value = profileName.textContent;
    editProfileSubtitlePlaceholder.value = profileSubtitle.textContent;
  }
  else if (modal === addCardModal) {
    modal.classList.add("modal_is-opened");
  }
  else if (modal === maxImageModal) {
    modal.classList.add("modal_is-opened");
  }
}

function handleEditProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = editProfileNamePlaceholder.value;
  profileSubtitle.textContent = editProfileSubtitlePlaceholder.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  let cardData = {
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
  openModal(editProfileModal)
});

addCardMOB.addEventListener("click", () => {
  openModal(addCardModal);
});

//Submit Buttons

editProfileModalForm.addEventListener("submit", handleEditProfileSubmit);
addCardModalForm.addEventListener("submit", handleAddCardSubmit);

//Close Button listeners created after Initilization and creation of Cards
