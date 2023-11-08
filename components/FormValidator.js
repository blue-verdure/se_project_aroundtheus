export default class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setInputListeners();
  }

  _setInputListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._options.inputSelector)
    );
    const button = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
    this._toggleButtonState(inputList, button);
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkValidity(input);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  _toggleButtonState(inputList, button) {
    if (inputList.some((input) => !input.validity.valid)) {
      button.classList.add(this._options.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._options.inactiveButtonClass);
      button.disabled = false;
    }
  }

  _checkValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
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
