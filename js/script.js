// Custom Cursor — only on devices with a fine pointer (mouse).
// Adding `custom-cursor` to <html> enables the ring via CSS; if this JS
// never runs, the native cursor stays visible (no invisible-cursor trap).
const cursor = document.getElementById('cursor');

if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.documentElement.classList.add('custom-cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Grow the ring over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

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
        }
    });

    // Close navbar when scrolling to top
    if (window.scrollY <= 100) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
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
    
    // Load certifications badges
    loadBadges();
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
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Syed Affan Hussain',
            to_email: 'syedaffan.dev@gmail.com'
        };

        // Send email using EmailJS
        emailjs.send('service_cnfqy6m', 'template_gitdmy4', templateParams)
            .then(function() {
                showSuccessMessage();
                form.reset();
            })
            .catch(function() {
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

// Badge to Credly URL Mapping
const badgeCredlyLinks = {
  "machine-learning-with-python.png": "https://www.credly.com/earner/earned/badge/60605069-c503-47e0-8635-3aa5826c1088",
  "chatbot-building-essentials.png": "https://www.credly.com/earner/earned/badge/1b4a1f3e-bf65-4d4d-91f3-99e668239cd1",
  "computer-vision-and-image-processing-essentials.png": "https://www.credly.com/earner/earned/badge/9661e044-e443-49ac-87a6-a3ce33114386",
  "deep-learning-essentials-with-keras.png": "https://www.credly.com/earner/earned/badge/ee99b5d8-c642-4f96-a367-4d5aa4a93045",
  "deep-learning-with-tensorflow.png": "https://www.credly.com/earner/earned/badge/a4923e63-6d73-4dc1-a840-7d2d12a6d60c",
  "microsoft-certified-azure-ai-fundamentals.png": "https://www.credly.com/earner/earned/badge/05957212-ec85-4e7c-8389-3eb24d94eef6",
  "microsoft-certified-dynamics-365-fundamentals.png": "https://www.credly.com/earner/earned/badge/e979d972-6909-4ca5-8d37-13caaa7a7245",
  "microsoft-certified-power-platform-fundamentals.png": "https://www.credly.com/earner/earned/badge/1437c682-085a-4ef0-bf37-aa59e31d18d0"
};

// Load Badges from images/badges folder
async function loadBadges() {
    const badgesContainer = document.getElementById('badges-container');
    
    if (!badgesContainer) {
        return;
    }
    
    try {
        // Get all badge images from folder
        const badgeFiles = Object.keys(badgeCredlyLinks);
        
        if (badgeFiles.length === 0) {
            badgesContainer.innerHTML = '<p style="text-align: center; color: var(--text-color); padding: 2rem;">No certifications available yet.</p>';
            return;
        }
        
        // Clear container
        badgesContainer.innerHTML = '';
        
        // Create badge cards for each image file
        badgeFiles.forEach((fileName) => {
            const badgeCard = createBadgeCard(fileName, badgeCredlyLinks[fileName]);
            badgesContainer.appendChild(badgeCard);
        });

    } catch (error) {
        badgesContainer.innerHTML = `<p style="text-align: center; color: #ff6b6b; padding: 2rem;">Unable to load certifications.</p>`;
    }
}

function createBadgeCard(fileName, credlyUrl) {
    const card = document.createElement('div');
    card.className = 'badge-card';
    
    // Extract name from filename (remove .png and replace hyphens with spaces, capitalize)
    const badgeName = fileName
        .replace(/\.[^/.]+$/, '') // Remove file extension
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
    
    card.title = `Click to view credential: ${badgeName}`;
    
    card.innerHTML = `
        <div class="badge-image-wrapper">
            <img src="images/badges/${fileName}" alt="${badgeName}" loading="lazy" onerror="this.onerror=null;this.src=&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='120'%3E%3Crect width='100%25' height='100%25' fill='%23112e42'/%3E%3Ctext x='50%25' y='50%25' fill='%2300abf0' font-family='Arial' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EBadge%3C/text%3E%3C/svg%3E&quot;">
        </div>
        <div class="badge-info">
            <div class="badge-name">${badgeName}</div>
        </div>
    `;
    
    // Add click handler to redirect to Credly
    card.addEventListener('click', () => {
        window.open(credlyUrl, '_blank');
    });
    
    return card;
}
