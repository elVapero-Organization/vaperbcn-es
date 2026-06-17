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

// ==========================================
// 3D Product Carousel
// ==========================================
const carouselStage = document.getElementById('carousel3DStage');
const carouselContainer = document.getElementById('carousel3DContainer');
const carouselIndicators = document.getElementById('carouselIndicators3D');
const carouselPrevButton = document.querySelector('.carousel-arrow-left');
const carouselNextButton = document.querySelector('.carousel-arrow-right');

if (carouselStage && carouselContainer) {
    const slides = Array.from(carouselStage.querySelectorAll('.product-card-3d'));
    let activeIndex = 0;

    const setSlideBackgrounds = () => {
        slides.forEach((slide) => {
            const image = slide.querySelector('.product-image-3d');
            const bgImage = image?.dataset.bgImage;

            if (image && bgImage) {
                image.style.backgroundImage = `url("${bgImage}")`;
            }
        });
    };

    const buildIndicators = () => {
        if (!carouselIndicators) return;
        carouselIndicators.innerHTML = '';

        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.className = 'carousel-indicator-3d';
            indicator.setAttribute('aria-label', `Go to product ${index + 1}`);
            indicator.addEventListener('click', () => {
                activeIndex = index;
                updateCarousel();
            });
            carouselIndicators.appendChild(indicator);
        });
    };

    const updateCarousel = () => {
        const lastIndex = slides.length - 1;
        const indicators = carouselIndicators
            ? Array.from(carouselIndicators.querySelectorAll('.carousel-indicator-3d'))
            : [];

        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');

            if (index === activeIndex) {
                slide.classList.add('active');
            } else if (index === activeIndex - 1) {
                slide.classList.add('prev');
            } else if (index === activeIndex + 1) {
                slide.classList.add('next');
            } else if (index === activeIndex - 2) {
                slide.classList.add('far-prev');
            } else if (index === activeIndex + 2) {
                slide.classList.add('far-next');
            }
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });

        if (carouselPrevButton) {
            carouselPrevButton.disabled = activeIndex === 0;
        }

        if (carouselNextButton) {
            carouselNextButton.disabled = activeIndex === lastIndex;
        }
    };

    const moveCarousel = (direction) => {
        const nextIndex = activeIndex + direction;
        if (nextIndex < 0 || nextIndex >= slides.length) return;
        activeIndex = nextIndex;
        updateCarousel();
    };

    setSlideBackgrounds();
    buildIndicators();
    updateCarousel();

    carouselPrevButton?.addEventListener('click', () => moveCarousel(-1));
    carouselNextButton?.addEventListener('click', () => moveCarousel(1));
}

