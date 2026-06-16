// ==========================================
// Mobile Menu Toggle
// ==========================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const warn = document.querySelector(".warn");


if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        warn.classList.toggle('active');
        header.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            warn.classList.remove('active');
            header.classList.remove('active');

        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            warn.classList.remove('active');
            header.classList.remove('active');

        }
    });
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}

