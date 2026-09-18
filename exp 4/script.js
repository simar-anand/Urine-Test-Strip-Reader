const form = document.getElementById('registrationForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();
    
    let isValid = true;

    const fullNameInput = document.getElementById('fullName');
    const fullNameValue = fullNameInput.value.trim();
    if (fullNameValue === "") {
        showError(fullNameInput, 'fullNameError', 'Patient Name is required.');
        isValid = false;
    }

    const addressInput = document.getElementById('address');
    const addressValue = addressInput.value.trim();
    if (addressValue === "") {
        showError(addressInput, 'addressError', 'Address is required.');
        isValid = false;
    }

    const mobileInput = document.getElementById('mobile');
    const mobileValue = mobileInput.value.trim();
    const firstChar = mobileValue.charAt(0);
    
    if (mobileValue === "") {
        showError(mobileInput, 'mobileError', 'Mobile number is required.');
        isValid = false;
    } else if (mobileValue.length !== 10) {
        showError(mobileInput, 'mobileError', 'Mobile number must be exactly 10 digits.');
        isValid = false;
    } else if (firstChar < '6' || firstChar > '9') {
        showError(mobileInput, 'mobileError', 'Mobile number must start with 6, 7, 8, or 9.');
        isValid = false;
    }

    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    if (emailValue === "") {
        showError(emailInput, 'emailError', 'Email address is required.');
        isValid = false;
    } else if (emailValue.indexOf('@') === -1 || emailValue.indexOf('.') === -1) {
        showError(emailInput, 'emailError', 'Enter a valid email address with @ and .');
        isValid = false;
    }

    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (genderSelected === null) {
        showError(null, 'genderError', 'Please select a gender.');
        isValid = false;
    }

    const bloodGroupInput = document.getElementById('bloodGroup');
    if (bloodGroupInput.value === "") {
        showError(bloodGroupInput, 'bloodGroupError', 'Please select a blood group.');
        isValid = false;
    }

    const departmentInput = document.getElementById('department');
    if (departmentInput.value === "") {
        showError(departmentInput, 'departmentError', 'Please select a department.');
        isValid = false;
    }

    const dobInput = document.getElementById('dob');
    const regDateInput = document.getElementById('regDate');

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for exact date comparison

    if (dobInput.value === "") {
        showError(dobInput, 'dobError', 'Date of Birth is required.');
        isValid = false;
    } else if (new Date(dobInput.value) > today) {
        showError(dobInput, 'dobError', 'Date of Birth cannot be in the future.');
        isValid = false;
    }

    if (regDateInput.value === "") {
        showError(regDateInput, 'regDateError', 'Registration Date is required.');
        isValid = false;
    } else if (new Date(regDateInput.value) > today) {
        showError(regDateInput, 'regDateError', 'Registration Date cannot be in the future.');
        isValid = false;
    }

    if (isValid === true) {
        alert('Patient Registration Successful!');
        form.reset();
    }
});

function showError(inputElement, errorSpanId, message) {
    const errorSpan = document.getElementById(errorSpanId);
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';

    if (inputElement !== null) {
        inputElement.classList.add('invalid-field');
    }
}

function clearErrors() {
    const errorSpans = document.querySelectorAll('.error-message');
    for (let i = 0; i < errorSpans.length; i++) {
        errorSpans[i].textContent = '';
        errorSpans[i].style.display = 'none';
    }

    const invalidInputs = document.querySelectorAll('.invalid-field');
    for (let i = 0; i < invalidInputs.length; i++) {
        invalidInputs[i].classList.remove('invalid-field');
    }
}

form.addEventListener('reset', function() {
    clearErrors();
});
