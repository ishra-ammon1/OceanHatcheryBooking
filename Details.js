document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#details');
    const fullName = document.querySelector('#fullName');
    const mobileNumberPrefix = document.querySelector('#mobileNumberPrefix');
    const mobileNumber = document.querySelector('#mobileNumber');
    const email = document.querySelector('#email');
    const confirmEmail = document.querySelector('#confirmEmail');
    const gender = document.querySelector('#gender');
    const continueButton = document.querySelector('.rectangle-parent button');

    continueButton.addEventListener('click', function (event) {
        if (
            fullName.value === '' ||
            mobileNumberPrefix.value === '' ||
            mobileNumber.value === '' ||
            email.value === '' ||
            confirmEmail.value === '' ||
            gender.value === ''
        ) {
            event.preventDefault();
            alert('Please fill out all the fields.');
        } else if (email.value !== confirmEmail.value) {
            event.preventDefault();
            alert('Emails do not match.');
        }
    });
});
