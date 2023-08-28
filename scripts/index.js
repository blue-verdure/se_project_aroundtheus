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
const galleryList = document.querySelector(".gallery");
const modalEdit = document.querySelector(".modal-edit");
const modalAdd = document.querySelector(".modal-add");
const editButton = document.querySelector(".profile__edit-button");
const closeButtonEdit = modalEdit.querySelector(".modal__close-button");
const closeButtonAdd = modalAdd.querySelector(".modal__close-button");
const addButton = document.querySelector(".profile__add-button");
const formElementEdit = document.querySelector(".modal__form");
const formElementAdd = document.querySelector(".modal__form_add");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");
const placeInput = document.querySelector("#place-input");
const linkInput = document.querySelector("#link-input");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const imgView = document.querySelector(".modal-view");
const imgClose = imgView.querySelector(".modal__close-button");

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
  const galleryDelete = galleryItem.querySelector(".gallery__delete-button");
  galleryDelete.addEventListener("click", deleteCard);
  const galleryLike = galleryItem.querySelector(".gallery__icon");
  galleryLike.addEventListener("click", () => {
    galleryLike.classList.toggle("gallery__icon_active");
  });
  galleryImage.addEventListener("click", (evt) => {
    popupImage(evt, galleryTitle.textContent);
  });
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
  galleryList.prepend(getGalleryElement(placeInput.value, linkInput.value));
  closeModal(modalAdd);
  placeInput.value = "";
  linkInput.value = "";
}

function deleteCard(evt) {
  evt.target.closest(".gallery__item").remove();
}

function handleEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalEdit);
}

function popupImage(evt, name) {
  imgView.querySelector(".modal__image").src = evt.target.src;
  imgView.querySelector(".modal__image").alt = evt.target.alt;
  const imgTitle = imgView.querySelector(".modal__img-title");
  imgTitle.textContent = name;
  openModal(imgView);
}

initialCards.forEach((item) =>
  galleryList.append(getGalleryElement(item.name, item.link))
);

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(modalEdit);
});
closeButtonEdit.addEventListener("click", () => {
  closeModal(modalEdit);
});

formElementEdit.addEventListener("submit", handleEditSubmit);
addButton.addEventListener("click", () => {
  openModal(modalAdd);
});
closeButtonAdd.addEventListener("click", () => {
  closeModal(modalAdd);
});

formElementAdd.addEventListener("submit", handleAddSubmit);

imgClose.addEventListener("click", () => {
  closeModal(imgView);
});
