/*
# Function to create a game board
function gameboard() {
    Create an empty 2D array called "board"
    Iterate over rows:
        Create an empty array within "board"
        Iterate over columns:
            Set the element in the empty array to represent an empty cell
    Return the game board
}

# Initialize the game board
game = gameboard()

# Function to control the game screen
function screenController() {
    Get the canvas element and its 2D context
    Get the score element
    Function to draw a colored square on the canvas
    Function to draw the game board on the canvas
    Initialize variables for time tracking, game over status, etc.
    Function to drop the tetromino
    Return the canvas, context, score element, and other functions
}

# Initialize the game screen controller
screen = screenController()
Call the function to draw the initial game board on the screen

# Class definition for a Tetromino piece
class Piece {
    Constructor to initialize the Tetromino piece with a letter
    Initialize Tetromino-specific properties such as shape, color, etc.
    Define methods to draw, undraw, move, rotate, check for collisions, and lock the piece
}

# Function to handle game logic
function gameController() {
    Define all possible Tetromino pieces with their shapes and colors
    Function to generate a random Tetromino piece
    Initialize variables for time tracking, game over status, etc.
    Function to drop the current Tetromino piece
    Generate an initial random Tetromino piece and start dropping it
    Return the functions and the current Tetromino piece
}

# Initialize the game controller
newGame = gameController()

# Function to handle player input
function InputHandler() {
    Listen for keyboard events
    Define controls for moving and rotating the Tetromino piece
    Return the control functions
}

# Initialize the input handler
playerControls = InputHandler()


Plan:
- make a code for a console version of the game
- add a UI and print the console game onto the page
- try to expand so that two people can play side by side (one with WASD and other other with arrow keys)
*/

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

const rows = 20;
const columns = 10;
const SQ = squareSize = 20;
const emptyCell = 'white'; // color of an empty square

let linesCleared = 0;
let lastTetris = false;
let score = 0;

let p;

function gameboard() {

    let board = [];
    for(let r = 0; r < rows; r++){
        board[r] = [];
        for(let c = 0; c < columns; c++){
            board[r][c] = emptyCell;
        }
    };
    
    console.log(board);

    return {
        board,
    };
    };
    

const game = new gameboard();
