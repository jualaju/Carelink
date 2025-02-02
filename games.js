document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('gameModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const gameContainer = document.getElementById('gameContainer');
    const restartBtn = document.getElementById('restartGame');
    const scoreDisplay = document.getElementById('gameScore');
    const timerDisplay = document.getElementById('gameTimer');

    let currentGame = null;
    let gameTimer = null;
    let score = 0;
    let timeElapsed = 0;

    // Category filtering
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            filterGames(category);
        });
    });

    function filterGames(category) {
        const games = document.querySelectorAll('.game-card');
        games.forEach(game => {
            if (category === 'all' || game.dataset.category === category) {
                game.style.display = 'block';
            } else {
                game.style.display = 'none';
            }
        });
    }

    // Game initialization
    window.startGame = function(gameType) {
        modalTitle.textContent = getGameTitle(gameType);
        modal.style.display = 'block';
        resetGame();
        
        switch(gameType) {
            case 'memory-match':
                initializeMemoryGame();
                break;
            case 'word-search':
                initializeWordSearch();
                break;
            case 'number-puzzle':
                initializeNumberPuzzle();
                break;
            case 'math-challenge':
                initializeMathGame();
                break;
        }

        startTimer();
    }

    function getGameTitle(gameType) {
        const titles = {
            'memory-match': 'Memory Match',
            'word-search': 'Word Search',
            'number-puzzle': 'Number Puzzle',
            'math-challenge': 'Math Challenge'
        };
        return titles[gameType] || 'Brain Game';
    }

    function resetGame() {
        score = 0;
        timeElapsed = 0;
        updateScore();
        updateTimer();
        if (gameTimer) clearInterval(gameTimer);
    }

    function startTimer() {
        gameTimer = setInterval(() => {
            timeElapsed++;
            updateTimer();
        }, 1000);
    }

    function updateScore() {
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function updateTimer() {
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        timerDisplay.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Memory Game
    function initializeMemoryGame() {
        const symbols = ['🌞', '🌙', '⭐', '🌍', '🌈', '🌺', '🍀', '🦋'];
        const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
        
        const grid = document.createElement('div');
        grid.className = 'memory-grid';
        
        cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.addEventListener('click', handleCardClick);
            grid.appendChild(card);
        });

        gameContainer.innerHTML = '';
        gameContainer.appendChild(grid);
    }

    // Add more game initializations and logic here...

    // Modal controls
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        if (gameTimer) clearInterval(gameTimer);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            if (gameTimer) clearInterval(gameTimer);
        }
    });

    restartBtn.addEventListener('click', () => {
        if (currentGame) {
            resetGame();
            currentGame();
        }
    });
}); 