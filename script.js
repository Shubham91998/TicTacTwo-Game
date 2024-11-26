const board = document.getElementById('board');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let gameBoard = Array(3).fill(null).map(() => Array(3).fill(null));
let gameWon = false;

// Create the board
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        board.appendChild(cell);

        // Click handler
        cell.addEventListener('click', () => {
            if (gameWon || cell.classList.contains('taken')) return;

            // Mark the cell
            cell.textContent = currentPlayer;
            cell.classList.add('taken');
            gameBoard[row][col] = currentPlayer;

            // Check if the game is won
            if (checkWin(row, col)) {
                gameWon = true;
                statusText.textContent = `Player ${currentPlayer} Wins!`;
                return;
            }

            // Switch players
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s Turn`;
        });
    }
}

// Check for win
function checkWin(row, col) {
    // Check row
    if (gameBoard[row].every(cell => cell === currentPlayer)) return true;

    // Check column
    if (gameBoard.every(row => row[col] === currentPlayer)) return true;

    // Check diagonals
    if (
        gameBoard[0][0] === currentPlayer &&
        gameBoard[1][1] === currentPlayer &&
        gameBoard[2][2] === currentPlayer
    )
        return true;

    if (
        gameBoard[0][2] === currentPlayer &&
        gameBoard[1][1] === currentPlayer &&
        gameBoard[2][0] === currentPlayer
    )
        return true;

    return false;
}
