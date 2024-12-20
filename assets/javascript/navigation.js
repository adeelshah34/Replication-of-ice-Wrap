document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    const navItems = document.querySelectorAll(".nav-item");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    let currentIndex = parseInt(localStorage.getItem("activeSlide"), 10) || 0;

    function updateLayout() {
        slides.forEach((slide) => {
            const pos = parseInt(slide.getAttribute("data-pos"), 10); // Get the data-pos of the slide
            const diff = (pos - currentIndex + slides.length) % slides.length;

            if (diff === 0) {
                // Center active slide
                slide.style.zIndex = slides.length;
                slide.style.opacity = "1";
                slide.style.transform = "translateY(0px) scale(1)";
            } else if (diff > 0 && diff <= 3) {
                // Slides below the active one
                slide.style.zIndex = slides.length - diff;
                slide.style.opacity = `${1 - diff * 0.2}`;
                slide.style.transform = `translateY(${diff * 40}px) scale(${1 - diff * 0.1})`; // Adjust translateY value
            } else if (diff > 3) {
                slide.style.zIndex = "0";
                slide.style.opacity = "0";
                slide.style.transform = "translateY(300px) scale(0.5)"; // Adjust this value
            } else if (diff < 0 && diff >= -3) {
                slide.style.zIndex = slides.length + diff;
                slide.style.opacity = `${1 + diff * 0.2}`;
                slide.style.transform = `translateY(${diff * -40}px) scale(${1 + diff * 0.1})`; // Adjust translateY value
            } else {
                slide.style.zIndex = "0";
                slide.style.opacity = "0";
                slide.style.transform = "translateY(-300px) scale(0.5)"; // Adjust this value
            }
        });

        // Update navigation active state
        navItems.forEach((navItem, index) => {
            const pos = parseInt(navItem.getAttribute("data-pos"), 10);
            navItem.classList.toggle("active", pos === currentIndex);
        });

        localStorage.setItem("activeSlide", currentIndex);

        setTooltips();
    }



    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateLayout();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateLayout();
    }

    function setTooltips() {
        const getCleanText = (navItem) => {
            // Retrieve only the top-level text of the navigation item
            return navItem.childNodes[0]?.nodeValue.trim() || navItem.textContent.trim();
        };

        const nextIndex = (currentIndex + 1) % navItems.length;
        const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length;

        prevButton.title = `Previous: ${getCleanText(navItems[prevIndex])}`;
        nextButton.title = `Next: ${getCleanText(navItems[nextIndex])}`;
    }


    // Initialize layout
    updateLayout();

    // Event listeners
    prevButton.addEventListener("click", showPrevSlide);
    nextButton.addEventListener("click", showNextSlide);
    prevButton.addEventListener("mouseenter", setTooltips);
    nextButton.addEventListener("mouseenter", setTooltips);
});
