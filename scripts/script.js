// Scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});

// Initialize Lucide icons
//comments added
lucide.createIcons();