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
function handlePopupClose(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  } else if (evt.target.classList.contains("modal__close-img")) {
    closeModal(evt.target.closest(".modal"));
  }
}
function handleEscClose(evt) {
  const openedModal = document.querySelector(".modal_opened");
  if (evt.key === "Escape" && openedModal) {
    closeModal(openedModal);
  }
}
function openModal(modal) {
  console.log(modal);
  modal.classList.add("modal_opened");
  page.addEventListener("keydown", handleEscClose);
  modal.addEventListener("click", handlePopupClose);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  page.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("click", handlePopupClose);
}
function handleAddSubmit(evt) {
  evt.preventDefault();
  gallery.prepend(getGalleryElement(placeInput.value, linkInput.value));
  closeModal(modalAdd);
  evt.target.reset();
}
function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = descInput.value;
  closeModal(modalEdit);
}
function openImage(evt, name) {
  const popup = document.querySelector(".modal-view");
  const popupImage = popup.querySelector(".modal__image");
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  const imgTitle = popup.querySelector(".modal__img-title");
  imgTitle.textContent = name;
  openModal(popup);
}

function handleMiscClick(evt) {
  //handler for image popup, like button, and delete button
  if (evt.target.classList.contains("gallery__image")) {
    openImage(
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

initialCards.forEach((item) =>
  gallery.append(getGalleryElement(item.name, item.link))
);

gallery.addEventListener("click", handleMiscClick);

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
