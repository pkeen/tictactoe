// whats the best way to organise my data?

let currentPlayer = 1; // 1 or -1?

let winningSquares = // array of three winning squares;

let gameStatus = // 0 for tie, 1 for player 1, -1 for player 2 wins

// game status object?


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
    a. Numbers that are divisible by 4 with no remainder make up the top-left to bottom-right diagonal
    b. Numbers that are divisible by 2 with no remainder (excluding 0) make up the bottom-left to top-right diagonal
    c. We can find out the row by dividing the index by 3 (as an integer value no decimal)
    d. We can find out the column by looking at the remainder of dividing the index by 3 


To Check For Diagonal Wins:

    Top-left to bottom-right diagonal:

        if (index % 4 === 0) {
            // run function checkDiagonalTopLeftDown
        }

        or

        if (!(index % 4)) {
            // call function checkDiagonalTopLeftDown
        }
    
    Bottom-left to top-right diagonal

    if (currentIdx && currentIdx % 2 === 0) {
        // call checkDiagonalBottomLeftUp
    }

    or 

    if (currentIdx && !(currentIdx % 2)) {
        // call checkDiagonalBottomLeftUp
    }


    
To Check for Column Wins

    const column = currentidx % 3 
        check row of 
        getColArray = (currentCol) => {

        }

    }
    for row //
    const currentRow = Math.floor(currentIdx / 3);
        checkRow(currentRow) {
            return array of row
        }




*/

/* to check 2d board for tie 

    const boardFull = board.flat().every(val => val !== null);