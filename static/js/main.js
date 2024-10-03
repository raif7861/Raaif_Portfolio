document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const sideNav = document.getElementById('side-nav');
    const navLinks = document.querySelectorAll('#side-nav a');
    const contactForm = document.getElementById('contact-form');
    const backToTop = document.getElementById('back-to-top');
    const floatingContact = document.getElementById('floating-contact');
    const popup = document.getElementById('popup-contact');
    const closePopup = document.getElementsByClassName('close')[0];
    const popupForm = document.getElementById('popup-contact-form');
    
    // Toggle side navigation
    navToggle.addEventListener('click', function() {
        sideNav.classList.toggle('open');
    });

    // Close side navigation when clicking outside
    document.addEventListener('click', function(event) {
        if (!sideNav.contains(event.target) && !navToggle.contains(event.target)) {
            sideNav.classList.remove('open');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Floating contact button
    floatingContact.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    // Close popup
    closePopup.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    // Smooth scrolling function
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            sideNav.classList.remove('open');
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animate skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const skillObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        bar.setAttribute('data-width', bar.style.width);
        bar.style.width = '0';
        skillObserver.observe(bar);
    });

    // Back to Top button functionality
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Experience card hover effect
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Form validation and submission
    function handleFormSubmit(e, form) {
        e.preventDefault();

        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const message = form.querySelector('[name="message"]');

        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(email.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        const formData = {
            name: name.value,
            email: email.value,
            message: message.value
        };

        // Here you would typically send the form data to your server
        console.log('Form submitted:', formData);
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();

        if (form === popupForm) {
            popup.style.display = 'none';
        }
    }

    contactForm.addEventListener('submit', function(e) {
        handleFormSubmit(e, this);
    });

    popupForm.addEventListener('submit', function(e) {
        handleFormSubmit(e, this);
    });

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
