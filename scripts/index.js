let initialCards = [
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
  document.querySelector(".card__template").content.firstElementChild;
const cardsList = document.querySelector(".cards__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal__close");
const editProfileName = document.querySelector("#profile-form-name");
const editProfileSubtitle = document.querySelector("#profile-form-subtitle");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileEditForm = document.querySelector(".modal__form");

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
