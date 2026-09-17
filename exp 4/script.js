const form = document.getElementById('registrationForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();
    let isValid = true;
    const fullNameInput = document.getElementById('fullName');
    const fullNameValue = fullNameInput.value.trim(); 
    const namePattern = /^[A-Za-z\s]+$/; 

    if (fullNameValue === "") {
        showError(fullNameInput, 'fullNameError', 'Patient Name is required.');
        isValid = false;
    } else if (!namePattern.test(fullNameValue)) {
        showError(fullNameInput, 'fullNameError', 'Patient Name must contain letters and spaces only.');
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
    const mobilePattern = /^[6-9]\d{9}$/;

    if (mobileValue === "") {
        showError(mobileInput, 'mobileError', 'Mobile number is required.');
        isValid = false;
    } else if (!mobilePattern.test(mobileValue)) {
        showError(mobileInput, 'mobileError', 'Enter a valid 10-digit Indian mobile number.');
        isValid = false;
    }
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        showError(emailInput, 'emailError', 'Email address is required.');
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        showError(emailInput, 'emailError', 'Enter a valid email address.');
        isValid = false;
    }
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
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
    today.setHours(0, 0, 0, 0);

    if (dobInput.value === "") {
        showError(dobInput, 'dobError', 'Date of Birth is required.');
        isValid = false;
    } else {
        const dobDate = new Date(dobInput.value);
        if (dobDate > today) {
            showError(dobInput, 'dobError', 'Date of Birth cannot be in the future.');
            isValid = false;
        }
    }
    if (regDateInput.value === "") {
        showError(regDateInput, 'regDateError', 'Registration Date is required.');
        isValid = false;
    } else {
        const regDate = new Date(regDateInput.value);
        if (regDate > today) {
            showError(regDateInput, 'regDateError', 'Registration Date cannot be in the future.');
            isValid = false;
        }
    }

    if (isValid) {
        alert('Patient Registration Successful!');
        form.reset();
    }
});

function showError(inputElement, errorSpanId, message) {
    const errorSpan = document.getElementById(errorSpanId);
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';

    if (inputElement) {
        inputElement.classList.add('invalid-field');
    }
}

function clearErrors() {
    const errorSpans = document.querySelectorAll('.error-message');
    errorSpans.forEach(span => {
        span.textContent = '';
        span.style.display = 'none';
    });

    const invalidInputs = document.querySelectorAll('.invalid-field');
    invalidInputs.forEach(input => {
        input.classList.remove('invalid-field');
    });
}

form.addEventListener('reset', function() {
    clearErrors();
});