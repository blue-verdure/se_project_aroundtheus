import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite-valley.jpg",
  },
  {
    name: "Lake Louise",
    link: "./images/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "./images/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise-national-park.jpg",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago-di-braies.jpg",
  },
];
const itemTemplate = document.querySelector("#item__template").content;
const gallery = document.querySelector(".gallery");
const modalEdit = document.querySelector(".modal-edit");
const modalAdd = document.querySelector(".modal-add");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formElementEdit = document.forms["edit-form"];
const formElementAdd = document.forms["add-form"];
const nameInput = document.querySelector("#name-input");
const descInput = document.querySelector("#desc-input");
const placeInput = document.querySelector("#place-input");
const linkInput = document.querySelector("#link-input");
const profileName = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const page = document.querySelector(".page");
const imgPreview = document.querySelector(".modal-preview");
const imgPreviewTitle = imgPreview.querySelector(".modal__img-title");
const imgPreviewImage = imgPreview.querySelector(".modal__image");

function handlePopupClose(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  } else if (evt.target.classList.contains("modal__close-img")) {
    closeModal(evt.target.closest(".modal"));
  }
}
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  page.addEventListener("keydown", handleEscClose);
  modal.addEventListener("click", handlePopupClose);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  page.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("click", handlePopupClose);
}

function createCard(data) {
  const galleryItem = new Card(data, "#item__template", handleImageClick);
  return galleryItem.getElement();
}
function handleAddSubmit(evt) {
  evt.preventDefault();
  const newGalleryItem = createCard({
    name: placeInput.value,
    link: linkInput.value,
  });
  gallery.prepend(newGalleryItem);
  closeModal(modalAdd);
  evt.target.reset();
}
function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = descInput.value;
  closeModal(modalEdit);
}

function handleImageClick(name, link) {
  imgPreviewImage.src = link;
  imgPreviewImage.alt = name;
  imgPreviewTitle.textContent = name;
  openModal(imgPreview);
}
initialCards.forEach((item) => {
  gallery.append(createCard(item));
});

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descInput.value = profileDesc.textContent;
  openModal(modalEdit);
});
formElementEdit.addEventListener("submit", handleEditSubmit);
addButton.addEventListener("click", () => {
  openModal(modalAdd);
});
formElementAdd.addEventListener("submit", handleAddSubmit);

const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_error-active",
  errorClass: "modal__error_visible",
};

const formList = Array.from(
  document.querySelectorAll(validationOptions.formSelector)
);
formList.forEach((form) => {
  const formValidator = new FormValidator(validationOptions, form);
  form.addEventListener("reset", () => {
    formValidator.resetValidation();
  });
  formValidator.enableValidation();
});
