export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._element
      .querySelector(".gallery__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
    this._element
      .querySelector(".gallery__delete-icon")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });
    this._element
      .querySelector(".gallery__icon")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });
  }

  // _handleImageClick() {
  //   const popup = document.querySelector(".modal-preview");
  //   const popupImage = popup.querySelector(".modal-preview__image");
  //   const popupCaption = popup.querySelector(".modal-preview__caption");
  //   popupImage.src = this._link;
  //   popupImage.alt = this._name;
  //   popupCaption.textContent = this._name;
  //   popup.classList.add("modal_opened");
  // }

  _handleLikeClick() {
    this._element
      .querySelector(".gallery__icon")
      .classList.toggle("gallery__icon_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  getElement() {
    this._element = document
      .querySelector(this._selector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);
    this._setEventListeners();
    this._element.querySelector(".gallery__title").textContent = this._name;
    this._element.querySelector(".gallery__image").src = this._link;
    this._element.querySelector(".gallery__image").alt = this._name;
    return this._element;
  }
}
