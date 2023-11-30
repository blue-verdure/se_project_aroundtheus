//FormValidator Class
//Adds validation to a form element
//It takes two parameters:
//options: An object that contains the selectors and classes for the form
//formElement: The form element that will be validated

export default class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    //List of all input elements in the form
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._options.inputSelector)
    );
    //The submit button element
    this._button = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
  }

  //Adds submit event listener and calls _setInputListeners
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setInputListeners();
  }

  //Hides the error message and removes the error class from the input element
  _hideInputError(inputElement, errorElement) {
    errorElement.textContent = "";
    inputElement.classList.remove(this._options.inputErrorClass);
    errorElement.classList.remove(this._options.errorClass);
  }

  //Disables the button
  _disableButton() {
    this._button.classList.add(this._options.inactiveButtonClass);
    this._button.disabled = true;
  }

  //Resets the form to its initial state
  resetValidation() {
    this._disableButton();
    this._inputList.forEach((input) => {
      this._hideInputError(input, this._getErrorElement(input));
    });
  }

  //Adds input event listeners that check validity and set button state to all input elements.
  _setInputListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkValidity(input);
        this._toggleButtonState();
      });
    });
  }

  //Toggles the submit button state based on the validity of the input elements.
  _toggleButtonState() {
    if (this._inputList.some((input) => !input.validity.valid)) {
      this._disableButton();
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._options.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  //Gets error element from the input element
  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  //Checks the validity of an input element and displays an error message if it is invalid.
  _checkValidity(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    if (!inputElement.validity.valid) {
      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._options.inputErrorClass);
      errorElement.classList.add(this._options.errorClass);
    } else {
      errorElement.textContent = "";
      inputElement.classList.remove(this._options.inputErrorClass);
      errorElement.classList.remove(this._options.errorClass);
    }
  }
}
