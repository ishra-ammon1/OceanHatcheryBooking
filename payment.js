document.addEventListener("DOMContentLoaded", function () {
    const cardNumberInput = document.getElementById("cardNumber");
    const expiryDateInput = document.getElementById("expiryDate");
    const cvcInput = document.getElementById("cvc");
    const continueButton = document.querySelector("#details button");

    continueButton.addEventListener("click", function (event) {
        if (!validateField(cardNumberInput) || !validateField(expiryDateInput) || !validateField(cvcInput)) {
            event.preventDefault();
            alert("Please fill in all fields before continuing.");
        }
    });

    function validateField(inputElement) {
        return inputElement.value.trim() !== "";
    }
});
