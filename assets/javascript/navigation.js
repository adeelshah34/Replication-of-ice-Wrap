document.addEventListener("DOMContentLoaded", () => {
    const navigationContainer = document.querySelector(".navigation"); // Scope to the navigation container
    const slides = document.querySelectorAll(".carousel-slide");
    const navItems = navigationContainer.querySelectorAll(".nav-item"); // Select only nav-items within the navigation
    const prevButton = navigationContainer.querySelector(".prev-button");
    const nextButton = navigationContainer.querySelector(".next-button");

    let currentIndex = parseInt(localStorage.getItem("activeSlide"), 10) || 0;

    function updateActiveSlide() {
        slides.forEach((slide) => {
            slide.classList.remove("active");
            if (parseInt(slide.dataset.pos, 10) === currentIndex) {
                slide.classList.add("active");
            }
        });

        navItems.forEach((navItem) => {
            navItem.classList.remove("active");
            if (parseInt(navItem.dataset.pos, 10) === currentIndex) {
                navItem.classList.add("active");
            }
        });

        localStorage.setItem("activeSlide", currentIndex);
        setTooltips();
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateActiveSlide();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateActiveSlide();
    }

    prevButton.addEventListener("click", showPrevSlide);
    nextButton.addEventListener("click", showNextSlide);

    function setTooltips() {
        const navItemsArray = Array.from(navItems);

        const nextIndex = (currentIndex + 1) % navItemsArray.length;
        const prevIndex = (currentIndex === 0) ? navItemsArray.length - 1 : currentIndex - 1;

        const nextNavItem = navItemsArray[nextIndex];
        const prevNavItem = navItemsArray[prevIndex];

        console.log("Next Nav Item:", nextNavItem.textContent);
        console.log("Previous Nav Item:", prevNavItem.textContent);

        prevButton.title = `Previous: ${prevNavItem.textContent.trim()}`;
        nextButton.title = `Next: ${nextNavItem.textContent.trim()}`;
    }

    updateActiveSlide();

    nextButton.addEventListener("mouseenter", () => {
        setTooltips();
    });

    prevButton.addEventListener("mouseenter", () => {
        setTooltips();
    });
});
