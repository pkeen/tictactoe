# Tic Tac Toe Game

## Description 
A simple two player, turn-based, Tic Tac Toe game.

Also featuring the ability to switch the board size. 

## Win Logic

I thought of two ways of doing this, one using the 2 dimensional array that was intuitive, the other uses a flat array to represent the board
    I believe the solution using the flat array may work slightly faster (would like to test)

### Flat Board Representation (1d Array)

        0, 1, 2,
        3, 4, 5,
        6, 7, 8,

    Numbers are array indexes. 

Looking at this:
    a. We can find out the column by looking at the remainder of dividing the index by 3 
    b. We can find out the row by dividing the index by 3 (as an integer value no decimal)
    c. Numbers that are divisible by 4 with no remainder make up the top-left to bottom-right diagonal
    d. Numbers that are divisible by 2 with no remainder (excluding 0) make up the bottom-left to top-right diagonal
    
#### To Find Current Column
```javascript
const column = currentidx % 3 // 3 for a standard sized game
    
// or 
const column = [];
for (let i = index % 3; i < board.length; i+=3) {
    column.push(board[i]);
} 
return column;
```

#### To Find Current Row
```javascript
const currentRow = Math.floor(currentIdx / 3);

```

#### To Find Diagonal Top Left Downward (TLD)

##### For the current index to be in the diagonal TLD line it must be evenly divisible by 4
```javascript
if (index % 4 === 0) {
    // run function checkDiagonalTRD
}

or

const diagTLD = board.filter((val, idx) => !(idx % 4))
```

    
#### To Find Diagonal Bottom-left-Upward (BLU)
```javascript
if (currentIdx && currentIdx % 2 === 0) {
    // call checkDiagonalBottomLeftUp
}

or 

if (currentIdx && !(currentIdx % 2)) {
    // call checkDiagonalBottomLeftUp
}
```


But ultimately what I wanted to return where not the values contained in the winning line indices, but the indices themselves, 
so that I could highlight the winning squares when game is over
    

#### Logic for testing:
1. `checkForWin(index)` 
2. test column for win
3. test row for win
4. test if index qualifies for testing against diagonals 
    1. check if index falls within diagonals
    2. If yes test against these indices
5. returns winning array if win || null if no win



/* to check 2d board for tie 

    const boardFull = board.flat().every(val => val !== null);

## Improvements for future
* CSS styling (half done needs improvement) 
* emoji for player?
* Minimax algorithm for AI player

