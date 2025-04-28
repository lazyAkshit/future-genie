// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 50) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    if (currentScroll === 0) {
        navbar.style.background = 'var(--chat-background)';
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.background = 'var(--chat-background)';
        navbar.style.boxShadow = '0 2px 8px var(--shadow-light)';
    }

    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize Lucide icons
lucide.createIcons();
// debugged
//final