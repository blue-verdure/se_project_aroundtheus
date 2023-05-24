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
function getGalleryElement(nm, lk) {
  let itemTemplate = document.querySelector("#item__template").content;
  let galleryItem = itemTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);
  let galleryImage = galleryItem.querySelector(".gallery__image");
  let galleryTitle = galleryItem.querySelector(".gallery__title");
  galleryImage.src = lk;
  galleryImage.alt = nm;
  galleryTitle.textContent = nm;
  return galleryItem;
}
for (let i = 0; i < initialCards.length; i++) {
  let galleryItem = getGalleryElement(
    initialCards[i].name,
    initialCards[i].link
  );
  galleryList.append(galleryItem);
}

let modal = document.querySelector(".modal");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close-button");
const formElement = document.querySelector(".modal__form");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;
editButton.addEventListener("click", () => {
  modal.classList.add("modal_opened");
});
closeButton.addEventListener("click", () => {
  modal.classList.remove("modal_opened");
});
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  modal.classList.remove("modal_opened");
}
formElement.addEventListener("submit", formSubmitHandler);
