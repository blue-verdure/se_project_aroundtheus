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
let itemTemplate = document.querySelector("#item__template").content;
let galleryList = document.querySelector(".gallery");
let modalEdit = document.querySelector(".modal-edit");
let modalAdd = document.querySelector(".modal-add");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close-button");
const closeButtonAdd = document.querySelector(".modal__close-button_add");
const addButton = document.querySelector(".profile__add-button");
const formElement = document.querySelector(".modal__form");
const formElementAdd = document.querySelector(".modal__form_add");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");
const placeInput = document.querySelector("#place-input");
const linkInput = document.querySelector("#link-input");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const imgView = document.querySelector(".imgview");
const imgClose = document.querySelector(".imgview__close-button");

function getGalleryElement(name, link) {
  let itemTemplate = document.querySelector("#item__template").content;
  let galleryItem = itemTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);
  let galleryImage = galleryItem.querySelector(".gallery__image");
  let galleryTitle = galleryItem.querySelector(".gallery__title");
  galleryImage.src = link;
  galleryImage.alt = name;
  galleryTitle.textContent = name;
  const galleryDelete = galleryItem.querySelector(".gallery__delete-button");
  galleryDelete.addEventListener("click", deleteCard);
  return galleryItem;
}

initialCards.forEach((item) =>
  galleryList.append(getGalleryElement(item.name, item.link))
);

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  modalEdit.classList.add("modal_opened");
});
closeButton.addEventListener("click", () => {
  modalEdit.classList.remove("modal_opened");
});
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  modalEdit.classList.remove("modal_opened");
}
formElement.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", () => {
  modalAdd.classList.add("modal_opened");
});
closeButtonAdd.addEventListener("click", () => {
  modalAdd.classList.remove("modal_opened");
});
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  galleryList.prepend(getGalleryElement(placeInput.value, linkInput.value));
  let newLikeButton = galleryList.querySelector(".gallery__icon");
  newLikeButton.addEventListener("click", () => {
    newLikeButton.classList.toggle("gallery__icon_active");
    console.log("please log");
  });
  modalAdd.classList.remove("modal_opened");
  placeInput.value = "";
  linkInput.value = "";
  const galleryDelete = galleryList.querySelector(".gallery__delete-button");
  galleryDelete.addEventListener("click", deleteCard);
  const galleryImage = galleryList.querySelector(".gallery__image");
  const galleryTitle = galleryList.querySelector(".gallery__title");
  galleryImage.addEventListener("click", (evt) => {
    popupImage(evt, galleryTitle.textContent);
  });
}
formElementAdd.addEventListener("submit", formSubmitHandlerAdd);

let galleryHearts = document.querySelectorAll(".gallery__icon");
galleryHearts.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("gallery__icon_active");
  });
});

function deleteCard(evt) {
  evt.target.closest(".gallery__item").remove();
}
function popupImage(evt, name) {
  imgView.classList.add("imgview_opened");
  imgView.querySelector(".imgview__image").src = evt.target.src;
  imgView.querySelector(".imgview__image").alt = evt.target.alt;
  let imgTitle = imgView.querySelector(".imgview__title");
  imgTitle.textContent = name;
}
let galleryItems = document.querySelectorAll(".gallery__item");
galleryItems.forEach((item) => {
  const galleryDelete = item.querySelector(".gallery__delete-button");
  const galleryImage = item.querySelector(".gallery__image");
  const galleryTitle = item.querySelector(".gallery__title");
  console.log(galleryTitle.textContent);
  galleryDelete.addEventListener("click", deleteCard);
  galleryImage.addEventListener("click", (evt) => {
    popupImage(evt, galleryTitle.textContent);
  });
});

imgClose.addEventListener("click", () => {
  imgView.classList.remove("imgview_opened");
});
