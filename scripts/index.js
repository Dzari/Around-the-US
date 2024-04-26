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

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector("#cards-list");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const editProfileModalCloseButton = document.querySelector(
  "#edit-profile-modal-close"
);
const editProfileName = document.querySelector("#edit-profile-name");
const editProfileSubtitle = document.querySelector("#edit-profile-subtitle");
const profileName = document.querySelector("#profile-name");
const profileSubtitle = document.querySelector("#profile-subtitle");
const profileEditForm = document.querySelector("#edit-profile-form");
const addPlaceButton = document.querySelector("#add-image-button");
const addPlaceModal = document.querySelector("#add-place-modal");
const addPlaceCloseButton = document.querySelector("#add-place-modal-close");
const addPlaceForm = document.querySelector("#add-place-form");
const addPlaceTitle = document.querySelector("#add-place-title");
const addPlaceLink = document.querySelector("#add-place-image-link");

//FUNCTIONS

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector("#card-like");
  const deletebutton = cardElement.querySelector("#card-delete");
  const picture = cardElement.querySelector("#card-image");
  const fullscreenModal = cardElement.querySelector("#fullscreen-image-modal");
  const fullscreenTitle = cardElement.querySelector("#fullscreen-title");
  const fullscreenImage = cardElement.querySelector("#fullscreen-image");
  const fullscreenCloseButton = cardElement.querySelector("#fullscreen-close");

  fullscreenTitle.textContent = data.name;
  fullscreenImage.src = data.link;
  fullscreenImage.alt = data.name;
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

  picture.addEventListener("click", () => {
    toggleModal(fullscreenModal);
  });

  fullscreenCloseButton.addEventListener("click", () => {
    toggleModal(fullscreenModal);
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});

//EVENT HANDLERS

function toggleModal(modal) {
  modal.classList.toggle("modal_is-opened");
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = editProfileName.value;
  profileSubtitle.textContent = editProfileSubtitle.value;
  toggleModal(profileEditModal);
}

function handleAddPlaceSubmit(e) {
  e.preventDefault();
  let cardData = {
    name: addPlaceTitle.value,
    link: addPlaceLink.value,
  };
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);

  toggleModal(addPlaceModal);
  addPlaceTitle.value = "";
  addPlaceLink.value = "";
}

//EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  toggleModal(profileEditModal);
  editProfileName.value = profileName.textContent;
  editProfileSubtitle.value = profileSubtitle.textContent;
});

editProfileModalCloseButton.addEventListener("click", () => {
  toggleModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addPlaceForm.addEventListener("submit", handleAddPlaceSubmit);

addPlaceCloseButton.addEventListener("click", () => {
  toggleModal(addPlaceModal);
});

addPlaceButton.addEventListener("click", () => {
  toggleModal(addPlaceModal);
});
