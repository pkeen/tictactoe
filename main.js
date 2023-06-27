/*----- constants -----*/
const PLAYER1 = 'X';
const PLAYER2 = 'O';

/*----- state variables -----*/
let board;
let currentPlayer;
let gameStatus; // 1 for player 1's turn, 2 for player 2's turn, 0 for game ends in draw, -1 for player 1 wins, -2 for player 2 wins

/*----- cached elements  -----*/
const mainSection = document.querySelector('main');
const boardSection = document.getElementById('board');
const playAgainBtn = document.getElementById('play-again');
const gameStatusMsg = document.createElement('h2');
gameStatusMsg.setAttribute('id', 'game-status');
mainSection.prepend(gameStatusMsg);

/*----- functions -----*/

    /*--- Check win functions ---*/

const checkDiagonalWinUp = (rowIdx, colIdx) => {
    // create array of containing diagonal upward from 0,2 values
    const diagUpArray = [];
    for (let i = 0, j = board.length -1; i < board.length; i++, j-- ) {
        diagUpArray.push(board[i][j])
    }
    return diagUpArray.every(val => val === board[rowIdx][colIdx]);
}

const checkDiagonalWinDown = (rowIdx, colIdx) => {
    // create array containing diagonal downward values from 0,0
    const diagDownArray = board.map((r, i) => board[i][i]);
    return diagDownArray.every(val => val === board[rowIdx][colIdx]);
}

const checkColWin = (rowIdx, colIdx) => {
    // create a array representing column currently in
    const colArray = board.map((r, i) => board[i][colIdx]);
    // every value in colArray equal to current cell value
    return colArray.every(val => val === board[rowIdx][colIdx])
}

const checkRowWin = (rowIdx, colIdx) => {
    // every value in current row is equal to current cell value
    return board[rowIdx].every(val => val === board[rowIdx][colIdx])
}

const checkWinner = (rowIdx, colIdx) => {
    return checkRowWin(rowIdx, colIdx) || 
        checkColWin(rowIdx, colIdx) || 
        checkDiagonalWinDown(rowIdx, colIdx) || 
        checkDiagonalWinUp(rowIdx, colIdx);
}
    /*--- check win functions ---*/

const renderPlayAgain = () => {
    gameStatus < 1 ? playAgainBtn.style.visibility = 'visible' : playAgainBtn.style.visibility = 'hidden';
}

const renderStatusMsg = () => {
    let msg = '';
    // if game over
    if (gameStatus <= 0) {
        if (gameStatus === -1) {
            msg = `player 1 wins`
        } else if (gameStatus === -2) {
            msg = `player 2 wins`
        } else {
            msg = `game was a draw`
        }
    } else {
        if (gameStatus === 1) {
            msg = `player 1 go`
        } else {
            msg = `player 2 go`
        }
    }

    gameStatusMsg.innerHTML = msg;
}

const renderBoard = () => {
    boardSection.innerHTML = '';
    board.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            const cell = document.createElement('div');
            cell.setAttribute('id', `${rowIdx}-${colIdx}`);
            cell.classList.add('cell');
            cell.innerText = board[rowIdx][colIdx];
            boardSection.append(cell);
        });
    })
}

const render = () => {
    renderBoard();
    renderPlayAgain();
    renderStatusMsg();
    console.log(`game status: ${gameStatus}`);
}

// Logic for updating the game based on turn taken
const updateGameStatus = (rowIdx, colIdx) => {
    // 1. Update Board
    // return out if square taken
    if (board[rowIdx][colIdx] !== null) return;
    // Update the board
    board[rowIdx][colIdx] = currentPlayer;


    // 2. Check if winner or tie
    if (checkWinner(rowIdx, colIdx)) {
        gameStatus = gameStatus * - 1; // will overwrite draw if board also full
    } else if (board.flat().every(val => val != null)) { // Or if board is full is a draw
        gameStatus = 0; // game is draw
    } 

    // 5. switch players if no winner or draw
    if (gameStatus > 0) {
        currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
        if (gameStatus > 1) {
            gameStatus = 1;
        } else {
            gameStatus = 2;
        }
    }
    
}

const handleClick = ({target}) => {
    // dont allow turns if already game over
    if (winner) return;
    // shorthand variables
    const rowIdx = target.id.split("-")[0];
    const colIdx = target.id.split("-")[1];

    // call update game status
    updateGameStatus(rowIdx, colIdx);
    
    // re-render
    render();
}

const init = () => {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    currentPlayer = PLAYER1;
    winner = false;
    gameStatus = 1;

    

    render();
}

/*----- init -----*/
init();

/*----- event listeners -----*/
// add the board event listener
boardSection.addEventListener("click", handleClick);
playAgainBtn.addEventListener("click", init);



// Thinking about this made me order Indian takeaway