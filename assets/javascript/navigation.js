document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    const navItems = document.querySelectorAll(".nav-item");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    let currentIndex = parseInt(localStorage.getItem("activeSlide"), 10) || 0;

    // Function to update the layout of the carousel
    function updateLayout() {
        slides.forEach((slide) => {
            const pos = parseInt(slide.getAttribute("data-pos"), 10);
            const diff = (pos - currentIndex + slides.length) % slides.length;

            // console.log(`Slide: ${pos}, Diff: ${diff}`);

            if (diff === 0) {
                // Center active slide
                slide.style.zIndex = slides.length;
                slide.style.transform = "translateY(0px) scale(1)";
                slide.style.opacity = "1"; // Keep all slides visible
            } else {
                // Other slides
                slide.style.zIndex = slides.length - diff;
                slide.style.transform = `translateY(${Math.sign(diff) * diff * 21}px) scale(${1 - Math.abs(diff) * 0.03})`;
                slide.style.opacity = "1"; // Keep all slides visible
            }
        });

        // Update navigation active state
        navItems.forEach((navItem, index) => {
            const pos = parseInt(navItem.getAttribute("data-pos"), 10);
            navItem.classList.toggle("active", pos === currentIndex);
        });

        localStorage.setItem("activeSlide", currentIndex);

        setTooltips(); // Update tooltips after layout changes
    }

    // Function to find navigation item based on the slide position
    function getNavItemByPos(pos) {
        return [...navItems].find((navItem) => parseInt(navItem.getAttribute("data-pos"), 10) === pos);
    }

    // Function to set tooltips for the navigation buttons
    function setTooltips() {
        const nextIndex = (currentIndex + 1) % slides.length;
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

        const nextNavItem = getNavItemByPos(nextIndex);
        const prevNavItem = getNavItemByPos(prevIndex);

        prevButton.title = `Previous: ${prevNavItem?.textContent.trim() || "Unknown"}`;
        nextButton.title = `Next: ${nextNavItem?.textContent.trim() || "Unknown"}`;
    }

    // Function to move to the next slide
    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateLayout();
    }

    // Function to move to the previous slide
    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateLayout();
    }

    // Initialize layout
    updateLayout();

    // Event listeners for navigation buttons
    prevButton.addEventListener("click", () => {
        showPrevSlide();
        setTooltips(); // Ensure tooltip updates immediately
    });

    nextButton.addEventListener("click", () => {
        showNextSlide();
        setTooltips(); // Ensure tooltip updates immediately
    });

    // Event listeners for navigation items
    navItems.forEach((navItem) => {
        navItem.addEventListener("click", () => {
            currentIndex = parseInt(navItem.getAttribute("data-pos"), 10);
            updateLayout();
        });
    });

    // Remove auto-scroll to prevent automatic image change
});
