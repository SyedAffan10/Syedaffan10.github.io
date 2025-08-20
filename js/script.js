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
    
    // Handle contact form submission
    setupContactForm();
});

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
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            phone: formData.get('phone'),
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
