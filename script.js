// Initialize AOS animations
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        once: true
    });

    // Add scrolled class to navbar on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });

    // Initialize Media Content Tabs
    const mediaTabs = document.querySelectorAll('.media-tab');
    const mediaContents = document.querySelectorAll('.media-content');

    mediaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            mediaTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all content
            mediaContents.forEach(content => content.classList.remove('active'));
            // Show selected content
            document.getElementById(tab.getAttribute('data-target') + '-content').classList.add('active');
        });
    });

    // Initialize Swiper Carousel
    const mediaCarousel = new Swiper('.media-carousel', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.media-next',
            prevEl: '.media-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    // Video hover effects
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const iframe = card.querySelector('iframe');
            if (iframe) {
                iframe.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const iframe = card.querySelector('iframe');
            if (iframe) {
                iframe.style.transform = 'scale(1)';
            }
        });
    });

    // Language Switcher
    const languageSwitchers = document.querySelectorAll('[data-language]');
    languageSwitchers.forEach(switcher => {
        switcher.addEventListener('click', function(e) {
            e.preventDefault();
            const language = this.getAttribute('data-language');

            // Update all elements with language data attributes
            document.querySelectorAll('[data-lang-en], [data-lang-el]').forEach(element => {
                if (element.hasAttribute(`data-lang-${language}`)) {
                    element.textContent = element.getAttribute(`data-lang-${language}`);
                }
            });

            // Handle placeholders
            document.querySelectorAll(`[data-lang-${language}-placeholder]`).forEach(element => {
                element.placeholder = element.getAttribute(`data-lang-${language}-placeholder`);
            });

            // Store language preference
            localStorage.setItem('preferredLanguage', language);
        });
    });

    // Load preferred language on page load
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'el'; // Default to Greek
    const languageSelector = document.querySelector(`[data-language="${preferredLanguage}"]`);
    if (languageSelector) {
        languageSelector.click();
    }

    // Handle form submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Here you would typically send the form data to your server
            // For demonstration, we'll just show a success message
            const formData = new FormData(this);
            const formValues = {};

            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }

            console.log('Form submitted:', formValues);

            // Reset form and show success message
            this.reset();

            // Create a success message element
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = preferredLanguage === 'el' ?
                'Το μήνυμά σας στάλθηκε με επιτυχία!' :
                'Your message was sent successfully!';

            this.appendChild(successMessage);

            // Remove the success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }

    // Add names to form elements for submission
    const formElements = document.querySelectorAll('#contact form input, #contact form textarea');
    formElements.forEach((element, index) => {
        if (!element.hasAttribute('name')) {
            switch (index) {
                case 0:
                    element.setAttribute('name', 'name');
                    break;
                case 1:
                    element.setAttribute('name', 'email');
                    break;
                case 2:
                    element.setAttribute('name', 'subject');
                    break;
                case 3:
                    element.setAttribute('name', 'message');
                    break;
            }
        }
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('footer .input-group');
    if (newsletterForm) {
        const subscribeButton = newsletterForm.querySelector('button');
        const emailInput = newsletterForm.querySelector('input[type="email"]');

        subscribeButton.addEventListener('click', function() {
            const email = emailInput.value.trim();

            if (!email) {
                return;
            }

            // Here you would send the email to your server for subscription
            console.log('Newsletter subscription:', email);

            // Reset input and show success message
            emailInput.value = '';

            // Create a success message element
            const successMessage = document.createElement('div');
            successMessage.className = 'text-success mt-2';
            successMessage.style.fontSize = '0.9rem';
            successMessage.textContent = preferredLanguage === 'el' ?
                'Ευχαριστούμε για την εγγραφή σας!' :
                'Thank you for subscribing!';

            newsletterForm.parentNode.appendChild(successMessage);

            // Remove the success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
});