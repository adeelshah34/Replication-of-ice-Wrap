// document.addEventListener('DOMContentLoaded', function () {
//     const pricingSection = document.getElementById('pricingSection');
//     const packageSelectionSection = document.getElementById('packageSelectionSection');
//     const backToPricingBtn = document.getElementById('backToPricing');
//     const selectPlanBtns = document.querySelectorAll('.select-plan-btn');
//     const subscriptionPeriodBtns = document.querySelectorAll('.subscription-period .btn');
//     const hostingToggleBtns = document.querySelectorAll('.pricing-btn-toggle');

//     // Handle hosting type toggle
//     hostingToggleBtns.forEach(btn => {
//         btn.addEventListener('click', function () {
//             hostingToggleBtns.forEach(b => b.classList.remove('active'));
//             this.classList.add('active');

//             // Update pricing logic based on hosting type (cloud/self-hosted)
//             const hostingType = this.dataset.hostingType;
//             console.log(`Switched to ${hostingType} hosting`);
//             // Add your pricing update logic here if needed
//         });
//     });

//     // Handle plan selection
//     selectPlanBtns.forEach(btn => {
//         btn.addEventListener('click', function () {
//             const planCard = this.closest('.pricing-card');
//             if (!planCard) return;

//             const planName = planCard.querySelector('.pricing-card-title')?.textContent || "N/A";
//             const planPrice = planCard.querySelector('.pricing-amount')?.textContent || "0.00";
//             const planPeriod = planCard.querySelector('.pricing-period')?.textContent || "";
//             const planFeatures = Array.from(planCard.querySelectorAll('.pricing-features p')).map(p => p.textContent);

//             // Update selected package card
//             const selectedCard = packageSelectionSection.querySelector('.selected-package-card');
//             if (selectedCard) {
//                 selectedCard.querySelector('h3').textContent = planName;
//                 selectedCard.querySelector('.package-price .amount').textContent = planPrice;
//                 selectedCard.querySelector('.package-price .period').textContent = planPeriod;

//                 const featuresList = selectedCard.querySelector('.package-features');
//                 featuresList.innerHTML = planFeatures.map(feature => `<li><i class="bi bi-check-circle-fill"></i>${feature}</li>`).join('');
//             }

//             // Update main content (e.g., plan name in header)
//             document.getElementById('selectedPlanName').textContent = planName;

//             // Show package selection section and hide pricing section
//             pricingSection.style.display = 'none';
//             packageSelectionSection.style.display = 'block';
//         });
//     });

//     // Handle "Back to Pricing" button
//     backToPricingBtn.addEventListener('click', function (e) {
//         e.preventDefault();
//         packageSelectionSection.style.display = 'none';
//         pricingSection.style.display = 'block';
//     });

//     // Handle subscription period selection (monthly/yearly)
//     subscriptionPeriodBtns.forEach(btn => {
//         btn.addEventListener('click', function () {
//             subscriptionPeriodBtns.forEach(b => b.classList.remove('active'));
//             this.classList.add('active');

//             const isYearly = this.dataset.period === 'yearly';
//             const priceElement = document.querySelector('.package-price .amount');
//             const periodElement = document.querySelector('.package-price .period');

//             if (priceElement && periodElement) {
//                 const currentPrice = parseFloat(priceElement.textContent) || 0;
//                 if (isYearly) {
//                     // Apply 17% discount for yearly subscription
//                     const discountedPrice = (currentPrice * 12 * 0.83).toFixed(2);
//                     priceElement.textContent = discountedPrice;
//                     periodElement.textContent = '/user /year';
//                 } else {
//                     // Calculate monthly price from yearly
//                     const monthlyPrice = (currentPrice / 12 / 0.83).toFixed(2);
//                     priceElement.textContent = monthlyPrice;
//                     periodElement.textContent = '/user /mo';
//                 }
//             }
//         });
//     });

//     // Initialize Bootstrap tooltips (if needed)
//     const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
//     tooltipTriggerList.forEach(tooltipTriggerEl => {
//         new bootstrap.Tooltip(tooltipTriggerEl);
//     });
// });



// JavaScript for handling pricing toggle between "Cloud" and "Self Hosted"
document.addEventListener("DOMContentLoaded", function () {
    const cloudButton = document.getElementById("cloudButton");
    const selfHostedButton = document.getElementById("selfHostedButton");
    const pricingCardsContainer = document.querySelector(".pricing-cards-container");

    // Function to toggle the pricing display
    function togglePricing(option) {
        const allCards = pricingCardsContainer.querySelectorAll(".pricing-card");

        // Show the cards based on the selected option (Cloud or Self Hosted)
        allCards.forEach(card => {
            if (card.classList.contains(option)) {
                card.style.display = "block";  // Show card
            } else {
                card.style.display = "none";  // Hide card
            }
        });
    }

    // Event listener for Cloud Button
    cloudButton.addEventListener("click", function () {
        cloudButton.classList.add("active");
        selfHostedButton.classList.remove("active");
        togglePricing("cloud");
    });

    // Event listener for Self Hosted Button
    selfHostedButton.addEventListener("click", function () {
        selfHostedButton.classList.add("active");
        cloudButton.classList.remove("active");
        togglePricing("self-hosted");
    });

    // Initially show Cloud pricing by default
    togglePricing("cloud");

    // Event listener for Plan Selection
    const selectPlanButtons = document.querySelectorAll(".select-plan-btn");

    selectPlanButtons.forEach(button => {
        button.addEventListener("click", function () {
            const planTitle = this.closest(".pricing-card").querySelector(".pricing-card-title").textContent;
            alert("You have selected the " + planTitle + " plan!");
        });
    });
});
