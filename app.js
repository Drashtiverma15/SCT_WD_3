const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cellIndex = e.target.dataset.index;
    
    if (!gameActive || gameBoard[cellIndex]) return;

    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    if (checkWin(currentPlayer)) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 10);
        gameActive = false;
        return;
    }
    
    if (gameBoard.every(cell => cell)) {
        setTimeout(() => alert("It's a draw!"), 10);
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

function restartGame() {
    gameBoard.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
}

board.addEventListener('click', handleClick);
restartBtn.addEventListener('click', restartGame);


