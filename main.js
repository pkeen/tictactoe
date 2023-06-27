/*----- constants -----*/
const PLAYER1 = 'X';
const PLAYER2 = 'O';

/*----- state variables -----*/
let board;
let playerTurn;
let winner;

/*----- cached elements  -----*/
const boardSection = document.getElementById('board');

/*----- functions -----*/

const determineWinner = () => {
    
}

const handleClick = ({target}) => {
    // shorthand var
    const idSplit = target.id.split("-");
    const cellPos = {
        [idSplit[0][0]]: idSplit[0][1],
        [idSplit[1][0]]: idSplit[1][1]
    }
    // update board data
    board[cellPos.r][cellPos.c] = playerTurn;
    // switch players
    playerTurn = playerTurn === PLAYER1 ? PLAYER2 : PLAYER1;
    // check if winner
    winner = determineWinner();
    // re-render
    render();

}

const renderBoard = () => {
    boardSection.innerHTML = '';
    board.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            const cell = document.createElement('div');
            cell.setAttribute('id', `r${rowIdx}-c${colIdx}`);
            cell.classList.add('cell');
            cell.innerText = board[rowIdx][colIdx];
            boardSection.append(cell);
        });
    })
}

const render = () => {
    renderBoard();
}

const init = () => {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    playerTurn = PLAYER1;

    render();
}

/*----- init -----*/
init();

/*----- event listeners -----*/
boardSection.addEventListener("click", handleClick)



// Thinking about this made me order Indian takeaway