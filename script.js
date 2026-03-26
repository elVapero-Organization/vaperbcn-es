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

/* ============================================
   3D PRODUCT CAROUSEL FUNCTIONALITY
   ============================================ */
class Carousel3D {
    constructor() {
        this.container = document.getElementById('carousel3DContainer');
        this.stage = document.getElementById('carousel3DStage');
        this.leftArrow = document.querySelector('.carousel-arrow-left');
        this.rightArrow = document.querySelector('.carousel-arrow-right');
        this.indicatorsContainer = document.getElementById('carouselIndicators3D');

        if (!this.container || !this.stage) return;

        this.cards = this.stage.querySelectorAll('.product-card-3d');
        this.currentIndex = 0;
        this.totalCards = this.cards.length;

        // Touch/Swipe variables
        this.isSwip = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.diff = 0;

        this.init();
    }

    init() {
        this.loadBackgroundImages(); // Load images first
        this.createIndicators();
        this.updateCarousel();
        this.attachEventListeners();
    }

    loadBackgroundImages() {
        // Load background images from data-bg-image attributes
        const imageContainers = this.stage.querySelectorAll('.product-image-3d[data-bg-image]');
        imageContainers.forEach(container => {
            const imagePath = container.getAttribute('data-bg-image');

            if (imagePath) {
                container.style.backgroundImage = `url('${imagePath}')`;
            }
        });
    }

    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        for (let i = 0; i < this.totalCards; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator-3d');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }

    attachEventListeners() {
        // Arrow navigation
        this.leftArrow?.addEventListener('click', () => this.prevSlide());
        this.rightArrow?.addEventListener('click', () => this.nextSlide());

        // Touch events for mobile
        this.container.addEventListener('touchstart', this.touchStart.bind(this), { passive: false });
        this.container.addEventListener('touchmove', this.touchMove.bind(this), { passive: false });
        this.container.addEventListener('touchend', this.touchEnd.bind(this));

        // Mouse events for desktop drag
        this.container.addEventListener('mousedown', this.mouseDown.bind(this));
        this.container.addEventListener('mousemove', this.mouseMove.bind(this));
        this.container.addEventListener('mouseup', this.mouseUp.bind(this));
        this.container.addEventListener('mouseleave', this.mouseUp.bind(this));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });
    }

    touchStart(e) {
        this.isSwip = true;
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
    }

    touchMove(e) {
        if (!this.isSwip) return;
        this.currentX = e.touches[0].clientX;
        this.diff = this.startX - this.currentX;
    }

    touchEnd(e) {
        if (!this.isSwip) return;

        this.isSwip = false;

        // Threshold for swipe (50px)
        if (Math.abs(this.diff) > 50) {
            if (this.diff > 0) {
                // Swiped left - next
                this.nextSlide();
            } else {
                // Swiped right - prev
                this.prevSlide();
            }
        }

        this.diff = 0;
    }

    mouseDown(e) {
        this.isSwip = true;
        this.startX = e.clientX;
        this.container.style.cursor = 'grabbing';
        e.preventDefault();
    }

    mouseMove(e) {
        if (!this.isSwip) return;
        this.currentX = e.clientX;
        this.diff = this.startX - this.currentX;
    }

    mouseUp(e) {
        if (!this.isSwip) return;

        this.isSwip = false;
        this.container.style.cursor = 'grab';

        // Threshold for drag (50px)
        if (Math.abs(this.diff) > 50) {
            if (this.diff > 0) {
                // Dragged left - next
                this.nextSlide();
            } else {
                // Dragged right - prev
                this.prevSlide();
            }
        }

        this.diff = 0;
    }

    updateCarousel() {
        // Remove all position classes
        this.cards.forEach(card => {
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
        });

        // Set positions for each card relative to current index
        this.cards.forEach((card, index) => {
            const position = this.getRelativePosition(index);

            if (position === 0) {
                card.classList.add('active');
            } else if (position === -1) {
                card.classList.add('prev');
            } else if (position === 1) {
                card.classList.add('next');
            } else if (position === -2) {
                card.classList.add('far-prev');
            } else if (position === 2) {
                card.classList.add('far-next');
            }
        });

        this.updateIndicators();
        this.updateArrows();
    }

    getRelativePosition(cardIndex) {
        let diff = cardIndex - this.currentIndex;

        // Handle circular wrapping
        if (diff > this.totalCards / 2) {
            diff -= this.totalCards;
        } else if (diff < -this.totalCards / 2) {
            diff += this.totalCards;
        }

        return diff;
    }

    updateArrows() {
        // Arrows are always enabled for circular carousel
        // If you want to disable at ends, uncomment below:
        /*
        if (this.leftArrow) {
            this.leftArrow.disabled = this.currentIndex === 0;
        }
        if (this.rightArrow) {
            this.rightArrow.disabled = this.currentIndex >= this.totalCards - 1;
        }
        */
    }

    updateIndicators() {
        const indicators = this.indicatorsContainer.querySelectorAll('.carousel-indicator-3d');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    new Carousel3D();
});
// ==========================================
// Filter Tabs Functionality
// ==========================================
const tabButtons = document.querySelectorAll('.tab-btn');
const nftGrid = document.getElementById('nftGrid');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked tab
            button.classList.add('active');

            // Get the tab data attribute
            const tabData = button.getAttribute('data-tab');

            // Add fade effect
            if (nftGrid) {
                nftGrid.style.opacity = '0';

                setTimeout(() => {
                    // Here you would filter the NFT grid content based on tabData
                    // For now, we'll just show all items with a fade-in effect
                    nftGrid.style.opacity = '1';
                }, 200);
            }

            // Log for debugging (remove in production)
            console.log(`Active tab: ${tabData}`);
        });
    });
}

// ==========================================
// Related Series Carousel
// ==========================================
const relatedCarousel = document.getElementById('relatedCarousel');
const relatedLeft = document.getElementById('relatedLeft');
const relatedRight = document.getElementById('relatedRight');
const relatedCounter = document.querySelector('.related-counter');

if (relatedCarousel && relatedLeft && relatedRight) {
    let currentIndex = 0;
    const relatedCards = relatedCarousel.querySelectorAll('.related-card');
    const totalCards = relatedCards.length;

    // Update counter
    const updateCounter = () => {
        if (relatedCounter) {
            relatedCounter.textContent = `${currentIndex + 1}/${totalCards}`;
        }
    };

    relatedLeft.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCounter();
            // Scroll to the card (this is a simple implementation)
            // For a more complex carousel, you'd calculate exact positions
        }
    });

    relatedRight.addEventListener('click', () => {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCounter();
        }
    });

    // Initialize counter
    updateCounter();
}

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for non-navigation links (like #bid, #login, etc.)
        if (href === '#' || href.length <= 1) {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = 80; // Approximate navbar height
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// NFT Grid Fade-in on Scroll (Optional)
// ==========================================
const observeElements = () => {
    const elements = document.querySelectorAll('.nft-grid-card, .feature-card, .related-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Initialize observer when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

// ==========================================
// Add hover sound effect (Optional - commented out)
// ==========================================
/*
const cards = document.querySelectorAll('.nft-card, .nft-grid-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // You can add sound effects here if needed
        // const audio = new Audio('path/to/hover-sound.mp3');
        // audio.play();
    });
});
*/

// ==========================================
// Performance: Reduce motion for users who prefer it
// ==========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ==========================================
// Console Message (Optional)
// ==========================================
console.log('%c🎨 Intruder Alert NFT Marketplace', 'color: #00f5ff; font-size: 20px; font-weight: bold;');
console.log('%c✨ Pixel-perfect design with neon effects', 'color: #ff006e; font-size: 14px;');
console.log('%c💎 Built with HTML5, CSS3, and Vanilla JavaScript', 'color: #00ff88; font-size: 14px;');

/* ============================================
   FOOTER
   ============================================ */

const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");

city.addEventListener("toggle", toggleCont);

city.addEventListener("click", () => {
    city.dispatchEvent(new Event("toggle"));
});

function toggleCont() {
    city.classList.toggle("active");
    const toggleLabel = city.querySelector(".city-toggle");
    if (toggleLabel) {
        toggleLabel.textContent = city.classList.contains("active") ? "Ver menos" : "Ver más";
    }
    cont.forEach((el) => {
        el.style.display = el.style.display === "block" ? "none" : "block";
    });
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}
