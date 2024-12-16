let score = 0;
let misses = 0;
let gameBox = document.getElementById('game-box');
let scoreDisplay = document.getElementById('score');
let startButton = document.getElementById('start-button');
let pauseButton = document.getElementById('pause-button');
let pauseScreen = document.getElementById('pause-screen');
let resumeButton = document.getElementById('resume-button');
let restartButton = document.getElementById('restart-button');
let restartLoseButton = document.getElementById('restart-lose-button');
let loseScreen = document.getElementById('lose-screen');
let difficultyButtons = document.querySelectorAll('.difficulty-button');

let gameInterval;
let boxSpeed = 1000; // Default to Normal speed

// Function to generate a random position for the box
function randomPosition() {
    let maxWidth = window.innerWidth - 100;
    let maxHeight = window.innerHeight - 100;
    let randomX = Math.floor(Math.random() * maxWidth);
    let randomY = Math.floor(Math.random() * maxHeight);
    
    gameBox.style.left = randomX + 'px';
    gameBox.style.top = randomY + 'px';
}

// Function to start the game
function startGame() {
    score = 0;
    misses = 0;
    scoreDisplay.innerText = 'Score: ' + score;
    gameBox.style.display = 'block'; // Show the game box
    randomPosition(); // Move the box to a random position
    gameInterval = setInterval(randomPosition, boxSpeed); // Move the box every interval
}

// Function to handle the box click
function boxClicked() {
    score += 1;
    scoreDisplay.innerText = 'Score: ' + score;
    randomPosition(); // Move the box to a new random position
}

// Function to track misses
function missedBox() {
    misses += 1;
    if (misses >= 10) {
        clearInterval(gameInterval); // Stop the game
        loseScreen.style.display = 'block'; // Show the "You Lose" screen
    }
}

// Function to pause the game
function pauseGame() {
    clearInterval(gameInterval); // Stop the game loop
    pauseScreen.style.display = 'block'; // Show the pause screen
}

// Function to resume the game
function resumeGame() {
    pauseScreen.style.display = 'none'; // Hide the pause screen
    gameInterval = setInterval(randomPosition, boxSpeed); // Restart the game loop
}

// Function to restart the game
function restartGame() {
    score = 0;
    misses = 0;
    scoreDisplay.innerText = 'Score: ' + score;
    gameBox.style.display = 'none'; // Hide the game box
    pauseScreen.style.display = 'none'; // Hide the pause screen
    loseScreen.style.display = 'none'; // Hide the lose screen
    clearInterval(gameInterval); // Stop the game loop
    startGame(); // Restart the game
}

// Set difficulty modes
function setDifficulty(mode) {
    switch (mode) {
        case 'easy':
            boxSpeed = 2000; // Slow box movement
            break;
        case 'normal':
            boxSpeed = 1000; // Normal speed
            break;
        case 'hard':
            boxSpeed = 500; // Faster box movement
            break;
        case 'extreme':
            boxSpeed = 300; // Very fast box movement
            break;
    }
    if (pauseScreen.style.display === 'none') {
        restartGame(); // Restart the game with new settings
    }
}

// Event listeners
startButton.addEventListener('click', startGame);
gameBox.addEventListener('click', boxClicked);
gameBox.addEventListener('mouseleave', missedBox); // Track when box is missed
pauseButton.addEventListener('click', pauseGame);
resumeButton.addEventListener('click', resumeGame);
restartButton.addEventListener('click', restartGame);
restartLoseButton.addEventListener('click', restartGame);
difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mode = button.getAttribute('data-difficulty');
        setDifficulty(mode);
        pauseGame(); // Pause the game to allow mode change
    });
});
