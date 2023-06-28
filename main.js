/*----- constants -----*/
const players = {
    1: 'X',
    2: '0'
}

/*----- state variables -----*/
let board;
let gameStatus; // 1 for player 1's turn, 2 for player 2's turn, 0 for game ends in draw, -1 for player 1 wins, -2 for player 2 wins
let winningSquares;

/*----- cached elements  -----*/
const mainSection = document.querySelector('main');
const boardSection = document.getElementById('board');
const playAgainBtn = document.getElementById('play-again');
const gameStatusMsg = document.createElement('h2');
gameStatusMsg.setAttribute('id', 'game-status');
mainSection.prepend(gameStatusMsg);

/*----- functions -----*/

// Get indices for current column
const colIndices = (index) => {
    return [...Array(3).keys()].map(x => x * 3 + (index % 3));
    }
// Get indices for current row
const rowIndices = (index) => {
    return [...Array(3).keys()].map(x => x + (Math.floor(index / 3) * 3))
}
// get indices for diagonal Top-Left-Down    
const diagTLDIndices = () => {
    return [...Array(3).keys()].map(x => x * 4);
}
// get incices for diagonal Bottom-Left-Up
const diagBLUIndices = () => {
    return [...Array(3).keys()].map(x => x * 2 + 2);
}
    
// Check the values in board corresponding to the indices provided, return true if they all match 
const lineIsWinner = (indicesToCheck, currentIndex) => {
    const lineValues = [];
    indicesToCheck.forEach(i => lineValues.push(board[i]));
    return lineValues.every(val => val === board[currentIndex]);
}

const getWinningLine = (index) => {
    // Returns the indices of winning line if there is one
    
    // Check current column
    const col = colIndices(index);
    if (lineIsWinner(col, index)) return col;
    
    // Check current column
    const row = rowIndices(index);
    if (lineIsWinner(row, index)) return row;
    
    // Check diagonal Top-Left-Downward if meets requirements
    if (index % 4 === 0) {
        const diagTL = diagTLDIndices();
        if (lineIsWinner(diagTL, index)) return diagTL;
    }
    
    // Check diagonal Bottom-Left-Up if meets requirements
    if (index % 2 === 0 && index < board.length && index > 0) {
        const diagBL = diagBLUIndices();
        if (lineIsWinner(diagBL, index)) return diagBL;
    }
}

const renderPlayAgain = () => {
    gameStatus < 1 ? playAgainBtn.style.visibility = 'visible' : playAgainBtn.style.visibility = 'hidden';
}

const renderStatusMsg = () => {
    let msg = '';

    if (gameStatus !== 0) {
        gameStatus > 0 ? msg = `${players[gameStatus]}'s Turn...` : msg = `${players[gameStatus*-1]} Wins!`
    } else {
        msg = `The game was a tie...`;
    }

    gameStatusMsg.innerHTML = msg;
}

const renderBoard = () => {

    boardSection.innerHTML = '';

    board.forEach((val, idx) => {
        const cell = document.createElement('div');
            cell.setAttribute('id', idx);
            cell.classList.add('cell');
            cell.innerText = val;
            boardSection.append(cell);
    })
}

const render = () => {
    renderBoard();
    renderPlayAgain();
    renderStatusMsg();
}

// Logic for updating the game based on turn taken
const updateGameStatus = (idx) => {
    // 1. Update Board
    // return out if square taken
    if (board[idx] !== null) return;
    // Update the board
    board[idx] = players[gameStatus];

    // 2. Check for winner
    // a. store winning square indecies in winningSquares if win
    winningSquares = getWinningLine(idx);
    //
    if (winningSquares) {
        gameStatus = gameStatus * - 1;
        boardSection.removeEventListener("click", handleClick); // remove event listener
    } else if (board.every(val => val !== null)) { // or check if tie
        gameStatus = 0;
        boardSection.removeEventListener("click", handleClick); // remove event listener
    }

    // 5. switch players if no winner or draw
    if (gameStatus > 0) {
        if (gameStatus > 1) {
            gameStatus = 1;
        } else {
            gameStatus = 2;
        }
    }
}

const handleClick = ({target}) => {
    // call update game status
    updateGameStatus(target.id);
    
    // re-render
    render();
}

const init = () => {
    board = [null, null, null, null, null, null, null, null, null]; // Hardcoded should change

    winningSquares = undefined;
    gameStatus = 1;

    // add the board event listener
    boardSection.addEventListener("click", handleClick);

    render();
}

/*----- init -----*/
init();

/*----- event listeners -----*/
playAgainBtn.addEventListener("click", init);



