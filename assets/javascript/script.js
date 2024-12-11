document.addEventListener('DOMContentLoaded', function () {
    // Toggle between Cloud and Self Hosted
    const toggleButtons = document.querySelectorAll('.btn-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Here you can add logic to switch between cloud and self-hosted pricing
            const hostingType = this.dataset.type;
            updatePricing(hostingType);
        });
    });

    function updatePricing(type) {
        // Example function to update pricing based on hosting type
        console.log(`Switching to ${type} pricing`);
        // Add your pricing update logic here
    }

    // Add hover effect to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});


<script>
    document.addEventListener('DOMContentLoaded', function () {
            const pricingSection = document.getElementById('pricingSection');
    const packageSection = document.getElementById('packageSelectionSection');
    const backButton = document.getElementById('backToPricing');
    const planButtons = document.querySelectorAll('.select-plan-btn');
    const periodButtons = document.querySelectorAll('[data-period]');
    const hostingButtons = document.querySelectorAll('.pricing-btn-toggle');

    // Features data
    const features = [
    {
        icon: '<i class="bi bi-envelope fs-2 text-primary"></i>',
    title: 'Hosted Email on your own domains',
    description: '200GB storage per mailbox'
                },
    {
        icon: '<i class="bi bi-chat-dots fs-2 text-primary"></i>',
    title: 'TeamChat',
    description: 'Chat in teams organized around projects'
                },
    {
        icon: '<i class="bi bi-camera-video fs-2 text-primary"></i>',
    title: 'Conferencing',
    description: 'Hold meetups and webinars for up to 1000 attendees'
                }
    ];

            // Handle plan selection
            planButtons.forEach(button => {
        button.addEventListener('click', function () {
            const plan = this.closest('.pricing-card');
            const title = plan.querySelector('h3').textContent;
            const features = Array.from(plan.querySelectorAll('.pricing-features p'))
                .map(p => p.textContent);

            // Update selected plan card
            document.querySelector('.selected-plan-title').textContent = title;
            document.getElementById('selectedPlanName').textContent = title;

            // Update features list
            const featuresList = document.querySelector('.features-list');
            featuresList.innerHTML = features.map(feature =>
                `<div class="feature-item">
                            <div class="feature-icon">${features[0].icon}</div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1">${feature}</h5>
                            </div>
                            <i class="bi bi-check-circle-fill text-success fs-4"></i>
                        </div>`
            ).join('');

            // Show package section
            pricingSection.style.display = 'none';
            packageSection.style.display = 'block';
        });
            });

    // Handle back button
    backButton.addEventListener('click', function (e) {
        e.preventDefault();
    packageSection.style.display = 'none';
    pricingSection.style.display = 'block';
            });

            // Handle subscription period selection
            periodButtons.forEach(button => {
        button.addEventListener('click', function () {
            periodButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const isYearly = this.dataset.period === 'yearly';
            const priceElement = document.querySelector('.selected-plan-price .h3');
            const periodElement = document.querySelector('.selected-plan-price .text-muted');

            if (priceElement && periodElement) {
                const basePrice = 3.50;
                if (isYearly) {
                    const yearlyPrice = (basePrice * 12 * 0.83).toFixed(2);
                    priceElement.textContent = `${yearlyPrice}€`;
                    periodElement.textContent = '/user /year';
                } else {
                    priceElement.textContent = `${basePrice}€`;
                    periodElement.textContent = '/user /mo';
                }
            }
        });
            });

            // Handle hosting type toggle
            hostingButtons.forEach(button => {
        button.addEventListener('click', function () {
            hostingButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
            });
        });
</script>