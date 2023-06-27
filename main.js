/*----- constants -----*/
const PLAYER1 = 'X';
const PLAYER2 = 'O';

/*----- state variables -----*/
let board;
let playerTurn;
let winner;

/*----- cached elements  -----*/
const mainSection = document.querySelector('main');
const boardSection = document.getElementById('board');
const playAgainBtn = document.getElementById('play-again');
const gameStatusMsg = document.createElement('h2');
gameStatusMsg.setAttribute('id', 'game-status');
mainSection.prepend(gameStatusMsg);

/*----- functions -----*/

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

const renderPlayAgain = () => {
    winner ? playAgainBtn.style.visibility = 'visible' : playAgainBtn.style.visibility = 'hidden';
}

const renderStatusMsg = () => {
    let msg = '';
    if (board.flat().every(val => val === null)) {
        msg = `${PLAYER1} goes first!`;
    } else if (board.flat().every(val => val !== null)) {
        if (winner) {
            msg = `${playerTurn} Wins!`;
        } else {
            msg = `The game was a tie!`;
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
}

const handleClick = ({target}) => {
    // dont allow turns if already game over
    if (winner) return;
    // shorthand variables
    const rowIdx = target.id.split("-")[0];
    const colIdx = target.id.split("-")[1];

    // update board data
    // if cell already taken exit:
    if (board[rowIdx][colIdx] !== null) return;
    // update board data
    board[rowIdx][colIdx] = playerTurn;

    // check if winner
    winner = checkWinner(rowIdx, colIdx);
    
    console.log(winner);
    
    // switch players
    playerTurn = playerTurn === PLAYER1 ? PLAYER2 : PLAYER1;
    
    // re-render
    render();
}

const init = () => {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    playerTurn = PLAYER1;
    winner = false;

    // add the board event listener
    boardSection.addEventListener("click", handleClick);

    render();
}

/*----- init -----*/
init();

/*----- event listeners -----*/

playAgainBtn.addEventListener("click", init);



// Thinking about this made me order Indian takeaway