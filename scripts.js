/*
Gamebaord:
- create board
- clear rows & check they are filled

Pieces: 
- line, J, L, cube, S, Z, T shapes and position
- move left & right (not outside bounds)
- rotate 90deg
- fast fall (think about hard and soft drops)
- land them at the bottom available space

GameController:
- game start
- pause / unpause game 
- gameover 
- select random piece to drop
- update board and screen each time interval
- take player inputs 
- update score for lines cleared (100 points for 1 line, 800 for 'tetris', 1200 for b2b 'tetris')
- increase fall rate based on lines cleared

ScreenController:
- call the board from 'Gameboard' and render them onto page
- have score counter update from 'GameController' 
- show a game over screen

InputHandler: 
- add event listeners for user keyboard inputs

Plan:
- make a code for a console version of the game
- add a UI and print the console game onto the page
- try to expand so that two people can play side by side (one with WASD and other other with arrow keys)
*/

function Gameboard() {
    const Cell = () => {
        let value = 0;

        const addShape = (shape) => {
            value = shape;
        };

        const getValue = () => value;

        return {
            addShape,
            getValue
        };
    };

    let rows = 24; // rows @ index 0 & 1 will be hidden above the board then 2 & 23 will be the walls
    let columns = 12; // columns @ index 0 & 11 will be walls
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    console.log(board);

    const initializeBoard = () => board;

    const isRowFilled = (row) => !row.some(Cell => Cell.getValue() === 0);

    const allRowsFilled = board.filter(isRowFilled);


    const clearFilledRows = (board) => {
        const filledRows = board.filter(isRowFilled);
        if (filledRows.length > 0) {
            for (const row of filledRows) {
                const rowIndex = board.indexOf(row);
                board.splice(rowIndex, 1);
            }

            const numRowsToAdd = filledRows.length;
            for (let i = 0; i < numRowsToAdd; i++) {
                board.unshift(Array(columns).fill(Cell()));
            }
        }
    }

    return {
        initializeBoard,
        isRowFilled,
        clearFilledRows
    };
};

const tetrominoNames = {
'I': [
    [[0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]],

    [[0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]],

    [[0,0,1,0],
    [0,0,1,0],
    [0,0,1,0],
    [0,0,1,0]],

    [[0,0,0,0],
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0]]
],

'J': [
    [[1,0,0],
    [1,1,1],
    [0,0,0]],

    [[0,1,1],
    [0,1,0],
    [0,1,0]],

    [[0,0,0],
    [1,1,1],
    [0,0,1]],

    [[0,1,0],
    [0,1,0],
    [1,1,0]]
],

'L': [
    [[0,0,1],
    [1,1,1],
    [0,0,0]],

    [[0,1,0],
    [0,1,0],
    [0,1,1]],

    [[0,0,0],
    [1,1,1],
    [1,0,0]],

    [[1,1,0],
    [0,1,0],
    [0,1,0]]
],

'O': [
    [1,1],
    [1,1],
],

'S': [
    [[0,1,1],
    [1,1,0],
    [0,0,0]],

    [[0,1,0],
    [0,1,1],
    [0,0,1]]
],

'Z': [
    [[1,1,0],
    [0,1,1],
    [0,0,0]],

    [[0,0,1],
    [0,1,1],
    [0,1,0]]
],

'T': [
    [[0,1,0],
    [1,1,1],
    [0,0,0]],

    [[0,1,0],
    [0,1,1],
    [0,1,0]],

    [[0,0,0],
    [1,1,1],
    [0,1,0]],

    [[0,1,0],
    [1,1,0],
    [0,1,0]]
]
};

const tetrominoColors = {
'I': 'cyan',
'O': 'yellow',
'T': 'purple',
'S': 'green',
'Z': 'red',
'J': 'blue',
'L': 'orange'
};

Gameboard()
