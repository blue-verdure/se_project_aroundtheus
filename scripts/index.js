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
const formElementEdit = document.querySelector(".modal__form");
const formElementAdd = document.querySelector(".modal__form_add");
const nameInput = document.querySelector("#name-input");
const descInput = document.querySelector("#desc-input");
const placeInput = document.querySelector("#place-input");
const linkInput = document.querySelector("#link-input");
const profileName = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const imgView = document.querySelector(".modal-view");

function getGalleryElement(name, link) {
  const itemTemplate = document.querySelector("#item__template").content;
  const galleryItem = itemTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);
  const galleryImage = galleryItem.querySelector(".gallery__image");
  const galleryTitle = galleryItem.querySelector(".gallery__title");
  galleryImage.src = link;
  galleryImage.alt = name;
  galleryTitle.textContent = name;
  return galleryItem;
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function handleAddSubmit(evt) {
  evt.preventDefault();
  gallery.prepend(getGalleryElement(placeInput.value, linkInput.value));
  closeModal(modalAdd);
  placeInput.value = "";
  linkInput.value = "";
}
function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = descInput.value;
  closeModal(modalEdit);
}
function popupImage(evt, name) {
  imgView.querySelector(".modal__image").src = evt.target.src;
  imgView.querySelector(".modal__image").alt = evt.target.alt;
  const imgTitle = imgView.querySelector(".modal__img-title");
  imgTitle.textContent = name;
  openModal(imgView);
}
function handleOverlayClose(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  } else if (evt.target.classList.contains("modal__close-img")) {
    closeModal(evt.target.closest(".modal"));
  }
}
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}
function handleMiscClick(evt) {
  //handler for image popup, like button, and delete button
  if (evt.target.classList.contains("gallery__image")) {
    popupImage(
      evt,
      evt.target.closest(".gallery__item").querySelector(".gallery__title")
        .textContent
    );
  } else if (evt.target.classList.contains("gallery__icon")) {
    evt.target.classList.toggle("gallery__icon_active");
  } else if (evt.target.classList.contains("gallery__delete-icon")) {
    evt.target.closest(".gallery__item").remove();
  }
}
function setInputListeners(form) {
  const inputList = Array.from(form.querySelectorAll(".modal__input"));
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkValidity(form, input);
    });
  });
}
function validationHandler() {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((form) => {
    form.addEventListener("submit", function(evt) => {
      evt.preventDefault();
    });
    setInputListeners(form);
  }); 
}

initialCards.forEach((item) =>
  gallery.append(getGalleryElement(item.name, item.link))
);

document.addEventListener("keydown", handleEscClose);
document.addEventListener("click", handleOverlayClose);
document.addEventListener("click", handleMiscClick);

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
