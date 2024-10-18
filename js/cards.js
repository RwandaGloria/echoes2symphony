// Get the card wrapper element and all cards
const cardWrapper = document.querySelector('.card-wrapper');

// Function to update the number of cards to show based on the viewport width
function updateCardsToShow() {
    if (window.innerWidth < 768) {
        // 1 card on small screens
        cardWrapper.style.setProperty('--cards-to-show', 1);
    } else if (window.innerWidth < 1024) {
        // 2 cards on medium screens
        cardWrapper.style.setProperty('--cards-to-show', 2);
    } else {
        // 4 cards on large screens
        cardWrapper.style.setProperty('--cards-to-show', 4);
    }
}

// Event listener to adjust the layout on window resize
window.addEventListener('resize', updateCardsToShow);

// Initial call to set the correct number of cards to show
updateCardsToShow();
