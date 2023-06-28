/*--- Check win functions ---*/

const getDiagonalTopRightDown = (idx) => {
    // create array of containing diagonal upward from 0,2 values
    const diagTopRightDownArray = []
    for (let i = 0; i < board.length; i += 4) {
        diagTopRightDownArray.push(board[i]);
    }
    return diagTopRightDownArray.every(val => val = board[idx]);
}

// const checkDiagonalWinDown = (rowIdx, colIdx) => {
//     // create array containing diagonal downward values from 0,0
//     const diagDownArray = board.map((r, i) => board[i][i]);
//     return diagDownArray.every(val => val === board[rowIdx][colIdx]);
// }

// const checkColWin = (rowIdx, colIdx) => {
//     // create a array representing column currently in
//     const colArray = board.map((r, i) => board[i][colIdx]);
//     // every value in colArray equal to current cell value
//     return colArray.every(val => val === board[rowIdx][colIdx])
// }

// const checkRowWin = (rowIdx, colIdx) => {
//     // every value in current row is equal to current cell value
//     return board[rowIdx].every(val => val === board[rowIdx][colIdx])
// }

// const checkWinner = (rowIdx, colIdx) => {
//     return checkRowWin(rowIdx, colIdx) || 
//         checkColWin(rowIdx, colIdx) || 
//         checkDiagonalWinDown(rowIdx, colIdx) || 
//         checkDiagonalWinUp(rowIdx, colIdx);
// }

const checkForWin(index) {
    // check if in diagonalTLD
    const diagonalDown = !(index % 4) && getDiagonalTopRightDown(index);

}
    /*--- check win functions ---*/

board = [1, 0, 1, -1, 1, 0, 0, 1, 1];

let ans = checkDiagonalTopRightDown(0);

