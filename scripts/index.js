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

//ELEMENTS

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardsList = document.querySelector("#cards-list");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const modalCloseButton = document.querySelector("#modal-close");
const editProfileName = document.querySelector("#edit-profile-name");
const editProfileSubtitle = document.querySelector("#edit-profile-subtitle");
const profileName = document.querySelector("#profile-name");
const profileSubtitle = document.querySelector("#profile-subtitle");
const profileEditForm = document.querySelector("#edit-profile-form");

//FUNCTIONS

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  cardImage.src = data.link;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});

//EVENT HANDLERS

function handleClosePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = editProfileName.value;
  profileSubtitle.textContent = editProfileSubtitle.value;
  handleClosePopup();
}

//EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  editProfileName.value = profileName.textContent;
  editProfileSubtitle.value = profileSubtitle.textContent;
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

modalCloseButton.addEventListener("click", handleClosePopup);
