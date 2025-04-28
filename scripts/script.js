// (Parika_auth.js)

// Theme toggle functionality
const themeSwitch = document.getElementById('theme-switch');
const chatThemeSwitch = document.getElementById('chat-theme-switch');
// debuggung in javascript 

// Function to toggle between light and dark themes
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);

    // Sync both theme toggles
    if (themeSwitch) themeSwitch.checked = newTheme === 'dark';
    if (chatThemeSwitch) chatThemeSwitch.checked = newTheme === 'dark';

    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
//final

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeSwitch) themeSwitch.checked = savedTheme === 'dark';
        if (chatThemeSwitch) chatThemeSwitch.checked = savedTheme === 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Default to dark if user prefers dark
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeSwitch) themeSwitch.checked = true;
        if (chatThemeSwitch) chatThemeSwitch.checked = true;
    }
}

// Event listeners for theme toggles
if (themeSwitch) themeSwitch.addEventListener('change', toggleTheme);
if (chatThemeSwitch) chatThemeSwitch.addEventListener('change', toggleTheme);

// Load saved theme on page load
loadSavedTheme();

// Modal functionality
const modal = document.getElementById('authModal');
const closeButton = document.querySelector('.close-button');

function showAuthModal() {
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

function hideAuthModal() {
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

if (closeButton) closeButton.addEventListener('click', hideAuthModal);
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideAuthModal();
    });
}

// Auth tabs functionality
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

authTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');

        // Reset all tabs and forms
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));

        // Activate selected tab and form
        this.classList.add('active');
        const formToActivate = document.querySelector(`.${tabName}-form`);
        if (formToActivate) {
            formToActivate.classList.add('active');
        }
    });
});

// Toggle password visibility
const togglePasswordButtons = document.querySelectorAll('.toggle-password');

togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
        const passwordInput = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');

        if (passwordInput) {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                if (icon) icon.setAttribute('data-lucide', 'eye-off');
            } else {
                passwordInput.type = 'password';
                if (icon) icon.setAttribute('data-lucide', 'eye');
            }

            // Update icons
            lucide.createIcons();
        }
    });
});
