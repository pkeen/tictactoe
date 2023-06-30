// whats the best way to organise my data?

// let currentPlayer = 1; // 1 or -1?

// let winningSquares = // array of three winning squares;


// game status object?

// const gameState = {
//     currentPlayer: 1;
//     board: [
//         [null, null, null]
//     ]
// }

/* Update game status function 

1. update board with player turn
2. check if winner
    - update winner
3. check if board full up
    
4. update status with 1, 2, 0, -1, -2;
5. if no winner or draw switch player turn

let gameStatus = // 1 for player 1's turn, 2 for player 2's turn, 0 for tie, -1 for player 1 wins, -2 for player 2 wins


/*------ Determining Winner  -------*/
/*
I thought of two ways of doing this, one using the 2 dimensional array that was intuitive, the other uses a flat array to represent the board
    I believe the solution using the flat array may work slightly faster (would like to test)

Flat Board Representation (1d Array)

        0, 1, 2,
        3, 4, 5,
        6, 7, 8,

    Numbers are array indexes. 

Looking at this:
    a. We can find out the column by looking at the remainder of dividing the index by 3 
    b. We can find out the row by dividing the index by 3 (as an integer value no decimal)
    c. Numbers that are divisible by 4 with no remainder make up the top-left to bottom-right diagonal
    d. Numbers that are divisible by 2 with no remainder (excluding 0) make up the bottom-left to top-right diagonal
    
To Check for Column Wins

    const column = currentidx % 3 
        check row of 
        getColArray = (currentCol) => {

        }
    }
    or 
    const column = [];
    for (let i = index % 3; i < board.length; i+=3) {
        column.push(board[i]);
    } 
    return column;

    for row //
    const currentRow = Math.floor(currentIdx / 3);
        checkRow(currentRow) {
            return array of row
        }
    



To Check For Diagonal Wins:

    Top-left downward diagonal line (abbreviated to TLD):

        if (index % 4 === 0) {
            // run function checkDiagonalTRD
        }

        or

        const diagTLD = board.filter((val, idx) => !(idx % 4))

        will return an array containing the values from the diagonal
    
    Bottom-left to top-right diagonal

    if (currentIdx && currentIdx % 2 === 0) {
        // call checkDiagonalBottomLeftUp
    }

    or 

    if (currentIdx && !(currentIdx % 2)) {
        // call checkDiagonalBottomLeftUp
    }



    But ultimately what I wanted to return where not the values contained in the winning line indices, but the indices themselves, 
    so that I could highlight the winning squares when game is over
    

So logic for testing :
    checkForWin(index) 
        tests if index qualifies for testing against diagonals 
            check if index falls within diagonals
                checkIfInDiagonalTLD(index) && getDiagonalTLD
            if yes tests against diagonals
        tests column for win
        tests row for win
        returns winning array if win || null if no win

*/

/* to check 2d board for tie 

    const boardFull = board.flat().every(val => val !== null);