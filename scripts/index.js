const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite-valley.png",
  },
  {
    name: "Lake Louise",
    link: "./images/lake-louise.png",
  },
  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.png",
  },
  {
    name: "Latemar",
    link: "./images/latemar.png",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise-national-park.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago-di-braies.png",
  },
];
let itemTemplate = document.querySelector("#item__template").content;
let galleryList = document.querySelector(".gallery");
let modal__edit = document.querySelector(".modal__edit");
let modal__add = document.querySelector(".modal__add");
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
const galleryItems = document.querySelectorAll(".gallery__item");

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
  return galleryItem;
}

initialCards.forEach((item) =>
  galleryList.append(getGalleryElement(item.name, item.link))
);

/*for (let i = 0; i < initialCards.length; i++) {
  let galleryItem = getGalleryElement(
    initialCards[i].name,
    initialCards[i].link
  );
  galleryList.append(galleryItem);
}*/

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  modal__edit.classList.add("modal_opened");
});
closeButton.addEventListener("click", () => {
  modal__edit.classList.remove("modal_opened");
});
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  modal__edit.classList.remove("modal_opened");
}
formElement.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", () => {
  modal__add.classList.add("modal_opened");
});
closeButtonAdd.addEventListener("click", () => {
  modal__add.classList.remove("modal_opened");
});
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  galleryList.prepend(getGalleryElement(placeInput.value, linkInput.value));
  modal__add.classList.remove("modal_opened");
  placeInput.value = "";
  linkInput.value = "";
}
formElementAdd.addEventListener("submit", formSubmitHandlerAdd);
