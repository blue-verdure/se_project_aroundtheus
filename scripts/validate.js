function checkValidity(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    errorElement.textContent = input.validationMessage;
    input.classList.add("modal__input_error-active");
  } else {
    errorElement.textContent = "";
    input.classList.remove("modal__input_error-active");
  }
}
function switchButtonState(inputList, button) {
  if (inputList.some((input) => !input.validity.valid)) {
    button.classList.add("modal__submit_disabled");
    button.disabled = true;
  } else {
    button.classList.remove("modal__submit_disabled");
    button.disabled = false;
  }
}
function setInputListeners(form) {
  const inputList = Array.from(form.querySelectorAll(".modal__input"));
  const button = form.querySelector(".modal__submit");
  console.log(button);
  switchButtonState(inputList, button);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkValidity(form, input);
      switchButtonState(inputList, button);
    });
  });
}
function validationHandler() {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setInputListeners(form);
  });
}
validationHandler();
