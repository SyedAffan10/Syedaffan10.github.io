let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('header nav a');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Close navbar when a link is clicked
navLinks.forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

// Typing Animation for Home Section
document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = [
        'Building AI Solutions',
        'Machine Learning Expert',
        'Computer Vision Specialist', 
        'LLM & RAG Developer',
        'Deep Learning Engineer'
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing animation
    if (typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }
});

//scroll section
let sections = document.querySelectorAll('section');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    //sticky header
    let header = document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 100);

    // Close navbar when scrolling to top
    if (window.scrollY <= 100) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }

    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Initialize EmailJS
    emailjs.init({
        publicKey: "DxhMYD34WxL87bRUh",
    });
    
    // Initialize phone number validation
    initPhoneValidation();
    
    // Handle contact form submission
    setupContactForm();
});

// Phone Number Validation
function initPhoneValidation() {
    const phoneInput = document.getElementById('phone-number');
    const countryCodeSelect = document.getElementById('country-code');
    
    // Only allow numbers in phone input
    phoneInput.addEventListener('input', function(e) {
        // Remove any non-digit characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Get max length for selected country
        const selectedCountry = countryCodeSelect.value;
        const expectedLengths = getExpectedPhoneLengths(selectedCountry);
        const maxLength = selectedCountry ? Math.max(...expectedLengths) : 15;
        
        // Limit to country-specific max length or 15 if no country selected
        if (value.length > maxLength) {
            value = value.slice(0, maxLength);
        }
        
        e.target.value = value;
        
        // Remove validation errors when user starts typing
        const errorElement = e.target.parentNode.querySelector('.validation-error');
        if (errorElement) {
            errorElement.remove();
            e.target.style.borderColor = '';
        }
        
        // Update character counter
        updatePhoneCounter(value.length);
    });
    
    // Prevent non-numeric characters from being typed
    phoneInput.addEventListener('keypress', function(e) {
        // Allow backspace, delete, tab, escape, enter
        if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    
    // Validate phone number length based on country
    function validatePhoneLength(countryCode, phoneNumber) {
        const allowedLengths = getExpectedPhoneLengths(countryCode);
        return allowedLengths.includes(phoneNumber.length);
    }
    
    // Add validation on form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        const countryCode = countryCodeSelect.value;
        const phoneNumber = phoneInput.value;
        
        // Remove any existing error messages
        removeValidationErrors();
        
        if (!countryCode) {
            e.preventDefault();
            showValidationError(countryCodeSelect, 'Please select a country code');
            return;
        }
        
        if (!phoneNumber) {
            e.preventDefault();
            showValidationError(phoneInput, 'Please enter a mobile number');
            return;
        }
        
        if (phoneNumber.length < 7) {
            e.preventDefault();
            const expectedLengths = getExpectedPhoneLengths(countryCode);
            const minLength = Math.min(...expectedLengths);
            showValidationError(phoneInput, `Mobile number should be at least ${minLength} digits for ${getCountryName(countryCode)}`);
            return;
        }
        
        if (!validatePhoneLength(countryCode, phoneNumber)) {
            e.preventDefault();
            const expectedLengths = getExpectedPhoneLengths(countryCode);
            const lengthText = expectedLengths.length === 1 
                ? `${expectedLengths[0]} digits` 
                : `${Math.min(...expectedLengths)}-${Math.max(...expectedLengths)} digits`;
            showValidationError(phoneInput, `Please enter a valid ${lengthText} mobile number for ${getCountryName(countryCode)}`);
            return;
        }
    });
    
    // Helper functions for validation UI
    function showValidationError(element, message) {
        element.style.borderColor = '#ef4444';
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '1.2rem';
        errorDiv.style.marginTop = '0.5rem';
        
        // Insert after the element's parent
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
        
        // Focus the element
        element.focus();
    }
    
    function removeValidationErrors() {
        const errorElements = document.querySelectorAll('.validation-error');
        errorElements.forEach(el => el.remove());
        
        // Reset border colors
        const inputs = document.querySelectorAll('#contact-form input, #contact-form select');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }
    
    // Clear validation errors when country code changes
    countryCodeSelect.addEventListener('change', function() {
        const errorElement = this.parentNode.querySelector('.validation-error');
        if (errorElement) {
            errorElement.remove();
            this.style.borderColor = '';
        }
        
        // Update counter when country changes
        const currentLength = phoneInput.value.length;
        updatePhoneCounter(currentLength);
    });
    
    // Helper function to update phone counter (optional visual feedback)
    function updatePhoneCounter(length) {
        const selectedCountry = countryCodeSelect.value;
        const expectedLengths = getExpectedPhoneLengths(selectedCountry);
        const maxLength = Math.max(...expectedLengths);
        const minLength = Math.min(...expectedLengths);
        
        let counterElement = document.getElementById('phone-counter');
        if (!counterElement) {
            // Create counter element if it doesn't exist
            counterElement = document.createElement('div');
            counterElement.id = 'phone-counter';
            counterElement.style.fontSize = '1.2rem';
            counterElement.style.color = 'var(--text-color)';
            counterElement.style.opacity = '0.7';
            counterElement.style.marginTop = '0.5rem';
            phoneInput.parentNode.appendChild(counterElement);
        }
        
        // Show appropriate message based on selected country
        if (!selectedCountry) {
            counterElement.textContent = `${length}/15 digits (select country first)`;
            counterElement.style.color = '#ef4444';
        } else if (expectedLengths.length === 1) {
            counterElement.textContent = `${length}/${maxLength} digits`;
        } else {
            counterElement.textContent = `${length} digits (${minLength}-${maxLength} expected)`;
        }
        
        // Change color based on length and selected country
        if (!selectedCountry) {
            counterElement.style.color = '#ef4444';
        } else if (expectedLengths.includes(length)) {
            counterElement.style.color = '#22c55e'; // Perfect length
        } else if (length < minLength) {
            counterElement.style.color = '#ef4444'; // Too short
        } else if (length > maxLength) {
            counterElement.style.color = '#ef4444'; // Too long
        } else {
            counterElement.style.color = '#f59e0b'; // In range but not exact
        }
    }
    
    // Helper function to get expected phone lengths for a country
    function getExpectedPhoneLengths(countryCode) {
        const phoneLengths = {
            '+1': [10], // US/Canada
            '+44': [10, 11], // UK
            '+91': [10], // India
            '+92': [10], // Pakistan
            '+86': [11], // China
            '+81': [10, 11], // Japan
            '+49': [11, 12], // Germany
            '+33': [9, 10], // France
            '+39': [9, 10], // Italy
            '+34': [9], // Spain
            '+7': [10], // Russia
            '+55': [10, 11], // Brazil
            '+52': [10], // Mexico
            '+61': [9], // Australia
            '+82': [8, 9], // South Korea
            '+65': [8], // Singapore
            '+971': [9], // UAE
            '+966': [9], // Saudi Arabia
            '+60': [9, 10], // Malaysia
            '+66': [9], // Thailand
            '+84': [9, 10], // Vietnam
            '+62': [8, 9, 10, 11], // Indonesia
            '+63': [10], // Philippines
            '+93': [9], // Afghanistan
            '+355': [9], // Albania
            '+213': [9] // Algeria
        };
        
        return phoneLengths[countryCode] || [7, 8, 9, 10, 11, 12, 13, 14, 15];
    }
    
    // Helper function to get country name from code
    function getCountryName(countryCode) {
        const countryNames = {
            '+1': 'US/Canada',
            '+44': 'UK',
            '+91': 'India',
            '+92': 'Pakistan',
            '+86': 'China',
            '+81': 'Japan',
            '+49': 'Germany',
            '+33': 'France',
            '+39': 'Italy',
            '+34': 'Spain',
            '+7': 'Russia',
            '+55': 'Brazil',
            '+52': 'Mexico',
            '+61': 'Australia',
            '+82': 'South Korea',
            '+65': 'Singapore',
            '+971': 'UAE',
            '+966': 'Saudi Arabia',
            '+60': 'Malaysia',
            '+66': 'Thailand',
            '+84': 'Vietnam',
            '+62': 'Indonesia',
            '+63': 'Philippines',
            '+93': 'Afghanistan',
            '+355': 'Albania',
            '+213': 'Algeria'
        };
        
        return countryNames[countryCode] || 'selected country';
    }
}

// Contact Form Handler
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loading = submitBtn.querySelector('.loading');
    const formStatus = document.getElementById('form-status');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        loading.style.display = 'inline';
        
        // Hide previous status messages
        formStatus.style.display = 'none';
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        // Get form data
        const formData = new FormData(form);
        const countryCode = formData.get('country_code');
        const phoneNumber = formData.get('phone');
        const fullPhoneNumber = countryCode && phoneNumber ? `${countryCode} ${phoneNumber}` : phoneNumber;
        
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            phone: fullPhoneNumber,
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Syed Affan Hussain',
            to_email: 'syedaffan.dev@gmail.com'
        };
        
        // Debug log to check template params
        console.log('Sending email with params:', templateParams);

        // Send email using EmailJS
        emailjs.send('service_cnfqy6m', 'template_gitdmy4', templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showSuccessMessage();
                form.reset();
            })
            .catch(function(error) {
                console.error('Error sending email:', error);
                showErrorMessage();
            })
            .finally(function() {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                loading.style.display = 'none';
            });
    });

    function showSuccessMessage() {
        formStatus.style.display = 'block';
        successMessage.style.display = 'flex';
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }

    function showErrorMessage() {
        formStatus.style.display = 'block';
        errorMessage.style.display = 'flex';
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}
