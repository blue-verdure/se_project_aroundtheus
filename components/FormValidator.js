function checkValidity(form, input, options) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    errorElement.textContent = input.validationMessage;
    input.classList.add(options.inputErrorClass);
    errorElement.classList.add(options.errorClass);
  } else {
    errorElement.textContent = "";
    input.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
  }
}
function switchButtonState(inputList, button, options) {
  if (inputList.some((input) => !input.validity.valid)) {
    button.classList.add(options.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(options.inactiveButtonClass);
    button.disabled = false;
  }
}
function setInputListeners(form, options) {
  const inputList = Array.from(form.querySelectorAll(options.inputSelector));
  const button = form.querySelector(options.submitButtonSelector);
  switchButtonState(inputList, button, options);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkValidity(form, input, options);
      switchButtonState(inputList, button, options);
    });
  });
}
function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setInputListeners(form, options);
  });
}
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_error-active",
  errorClass: "modal__error_visible",
});
