// Card Class
// Creates a card element on the page
// It takes three parameters:
// data: The data object that contains the name and link for the card
// cardSelector: The selector used to find the template for the card
// handleImageClick: The function that will be called when the card image is clicked
export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  //Adds event listeners to the card for the image, delete icon, and like icon clicks.
  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
    this._deleteIcon.addEventListener("click", () => {
      this._deleteCardElement();
    });
    this._likeIcon.addEventListener("click", () => {
      this._handleLikeClick();
    });
  }

  // Toggles the like icon.
  _handleLikeClick() {
    this._likeIcon.classList.toggle("gallery__like-icon_active");
  }

  // Deletes the card element.
  _deleteCardElement() {
    this._element.remove();
    this._element = null;
  }

  // Gets the card element from the template and returns it with listeners and proper content.
  getElement() {
    this._element = document
      .querySelector(this._selector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);
    this._likeIcon = this._element.querySelector(".gallery__like-icon");
    this._deleteIcon = this._element.querySelector(".gallery__delete-icon");
    this._image = this._element.querySelector(".gallery__image");
    this._setEventListeners();
    this._element.querySelector(".gallery__title").textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    return this._element;
  }
}
