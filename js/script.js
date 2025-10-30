// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Certificate Slider
const certificatesContainer = document.querySelector('.certificates-container');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        currentSlide = index;
        updateSlider();
    });
});

function updateSlider() {
    const translateX = -currentSlide * 330; // 300px width + 30px margin
    certificatesContainer.style.transform = `translateX(${translateX}px)`;
    
    // Update active dot
    sliderDots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Auto slide certificates
setInterval(() => {
    currentSlide = (currentSlide + 1) % 3;
    updateSlider();
}, 4000);

// Typing Effect
const typedTextSpan = document.querySelector('.typed-text');
const typedItems = ['Data Scientist', 'Data Analyst', 'AI/ML Engineer'];
let itemIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentItem = typedItems[itemIndex];
    
    if (isDeleting) {
        // Remove char
        typedTextSpan.textContent = currentItem.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add char
        typedTextSpan.textContent = currentItem.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentItem.length) {
        // Pause at end of word
        isDeleting = true;
        setTimeout(type, 1000);
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        itemIndex = (itemIndex + 1) % typedItems.length;
        setTimeout(type, 500);
    } else {
        // Normal typing/deleting speed
        const typeSpeed = isDeleting ? 50 : 100;
        setTimeout(type, typeSpeed);
    }
}

// Start typing effect
document.addEventListener('DOMContentLoaded', type);

// Form submission with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Send email using EmailJS
    emailjs.send("service_your_service_id", "template_your_template_id", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: "gopisarswat24@gmail.com"
    })
    .then(function(response) {
        alert('Thank you for your message! I will get back to you soon.');
        document.getElementById('contactForm').reset();
    }, function(error) {
        alert('Failed to send message. Please try again later or contact me directly at gopisarswat24@gmail.com');
    });
});

// Initialize EmailJS with your public key
// You need to sign up at https://www.emailjs.com/ and get your own keys
(function() {
    // Replace with your EmailJS public key
    emailjs.init("your_public_key_here");
})();