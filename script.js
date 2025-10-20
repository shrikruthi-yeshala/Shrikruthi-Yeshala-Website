// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) {
        return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('formStatus');
    const nextInput = document.getElementById('formNextUrl');

    if (nextInput) {
        const thankYouUrl = new URL('thankyou.html', window.location.href);
        nextInput.value = thankYouUrl.href;
    }

    contactForm.addEventListener('submit', function(e) {
        clearErrorMessages();
        resetFormStatus();
        setSubmittingState(false);

        let isValid = true;

        const firstName = document.getElementById('firstName');
        if (!firstName.value.trim()) {
            showError('firstNameError', 'First name is required');
            isValid = false;
        }

        const lastName = document.getElementById('lastName');
        if (!lastName.value.trim()) {
            showError('lastNameError', 'Last name is required');
            isValid = false;
        }

        const email = document.getElementById('email');
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if (!email.value.trim()) {
            showError('emailError', 'Email address is required');
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            showFormStatus('Please fix the highlighted fields and try again.', 'error');
            return;
        }

        const firstNameValue = firstName.value.trim();
        const lastNameValue = lastName.value.trim();
        const emailValue = email.value.trim();

        const replyToInput = document.getElementById('formReplyTo');
        if (replyToInput) {
            replyToInput.value = emailValue;
        }

        const subjectInput = contactForm.querySelector('input[name="_subject"]');
        if (subjectInput) {
            const fullName = [firstNameValue, lastNameValue].filter(Boolean).join(' ');
            subjectInput.value = fullName ? `Portfolio contact from ${fullName}` : 'New message from personasite contact form';
        }

        try {
            const formData = {
                firstName: firstNameValue,
                lastName: lastNameValue,
                email: emailValue
            };
            sessionStorage.setItem('formData', JSON.stringify(formData));
        } catch (error) {
            console.warn('Unable to store contact form data in sessionStorage:', error);
        }

        setSubmittingState(true);
        showFormStatus('Sending your message...', 'info');
    });

    function setSubmittingState(isSubmitting) {
        if (!submitButton) return;

        submitButton.disabled = isSubmitting;
        submitButton.textContent = isSubmitting ? 'Sending...' : 'Send Message';
    }

    function resetFormStatus() {
        if (!formStatus) return;

        formStatus.textContent = '';
        formStatus.style.display = 'none';
        formStatus.classList.remove('error', 'success', 'info');
    }

    function showFormStatus(message, type) {
        if (!formStatus) return;

        formStatus.textContent = message;
        formStatus.style.display = 'block';
        formStatus.classList.remove('error', 'success', 'info');
        formStatus.classList.add(type);
    }
});

// Helper function to show error messages
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Helper function to clear error messages
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });

    const formFields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formFields.forEach(field => {
        field.style.borderColor = '';
    });
}

// Real-time validation for better UX
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error message when user starts typing
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });
    });
});

// Field-specific validation
function validateField(field) {
    const fieldId = field.id;
    const errorId = fieldId + 'Error';
    const errorElement = document.getElementById(errorId);
    
    if (!errorElement) return;
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldId) {
        case 'firstName':
        case 'lastName':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = fieldId === 'firstName' ? 'First name is required' : 'Last name is required';
            }
            break;
            
        case 'email':
            const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Email address is required';
            } else if (!emailPattern.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
    }
    
    if (!isValid) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        field.style.borderColor = '#dc3545';
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        field.style.borderColor = '#28a745';
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading state to form submission

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const navMenu = document.querySelector('.nav-links');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
});

// Add animation classes for scroll effects
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.highlight-card, .project-card, .interest-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .highlight-card,
    .project-card,
    .interest-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .highlight-card.animate-in,
    .project-card.animate-in,
    .interest-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
