// Global variables
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timerInterval;
let time = 0;

// Define card values
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Select DOM elements
const cardContainer = document.getElementById('card-container');
const movesCount = document.getElementById('moves-count');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart-button');

// Start a new game
function startNewGame() {
    cards = [];
    flippedCards = [];
    matchedCards = 0;
    moves = 0;
    time = 0;
    clearInterval(timerInterval);
    timerDisplay.textContent = '00:00';
    movesCount.textContent = '0';

    // Shuffle cards and display them
    setupCards();
    startTimer();
}

// Setup game by shuffling cards
function setupCards() {
    const shuffledValues = shuffle([...cardValues, ...cardValues]); // Duplicate values for pairs
    cardContainer.innerHTML = ''; // Clear previous cards

    shuffledValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        cardContainer.appendChild(card);
        cards.push(card);
    });
}

// Shuffle function to randomize the card order
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }, 1000);
}

// Format time to always show two digits (e.g., 01:09)
function formatTime(number) {
    return number < 10 ? `0${number}` : number;
}

// Flip the card and handle logic
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesCount.textContent = moves;
            checkMatch();
        }
    }
}

// Check if the flipped cards match
function checkMatch() {
    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        matchedCards += 2;

        // Check if all cards are matched
        if (matchedCards === cards.length) {
            clearInterval(timerInterval);
            alert(`You won! Moves: ${moves}, Time: ${timerDisplay.textContent}`);
        }

        flippedCards = [];
    } else {
        setTimeout(() => {
            flippedCards[0].classList.remove('flipped');
            flippedCards[1].classList.remove('flipped');
            flippedCards[0].textContent = '';
            flippedCards[1].textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Restart the game
restartButton.addEventListener('click', startNewGame);

// Initialize the game
startNewGame();
