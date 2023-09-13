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

let activePiece;

function gameboard() {

    let board = [];  
    for(let r = 0; r < rows; r++){
        board[r] = [];
        for(let c = 0; c < columns; c++){
            board[r][c] = emptyCell; // set the element in the empty array to represent an empty cell;
        }
    };

    return {
        board  // the board array will be accessible through 'game.board';
        };
    }

    

const game = new gameboard();

function screenController() {

    const cvs = document.getElementById("canvas");
    const ctx = cvs.getContext("2d");
    const scoreElement = document.getElementById("score");
    
    function drawSquare(x, y, colour){
        ctx.fillStyle = colour;
        ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
    
        ctx.strokeStyle = "black";
        ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
    }
    
    
    function drawBoard(){
        for(let r = 0; r < rows; r++){
            for(let c = 0; c < columns; c++){
                drawSquare(c, r, game.board[r][c]); //'game.board[r][c]' is accesses the colour stored in the cell of the gameboard
            }
        }
    }
    
    let dropStart = Date.now();
    let gameOver = false;
    function drop() {
        let now = Date.now();
        let timeDiff = now - dropStart;
        if(timeDiff > 1000){
            activePiece.moveDown();
            dropStart = Date.now();
        }
        if( !gameOver){
            requestAnimationFrame(drop);    // for as long as the game isn't over the animation to drop the piece a row is called
        }
    };
    
    return {
        scoreElement,
        drawSquare,
        drawBoard,
        drop
    }
};
    
const screen = screenController();
screen.drawBoard();

class Piece {
    constructor(letter) {
        this.letter = letter
        this.tetromino = tetrominoNames[`${this.letter}`]; // name from tetromino array
        this.colour = tetrominoColors[`${this.letter}`]; // colour from tetromino array
        this.emptyCell = emptyCell
    
        
    
        this.rotation = 0; // first instance of the tetromino [0]
        this.tetrominoOrientation = tetrominoNames[`${this.letter}`][this.rotation];
    
        this.x = 3; // spawns tetromino in 4th column
        this.y = -this.tetrominoOrientation.length; // spawns it up over the board
    
        this.length = this.tetrominoOrientation.length
        
        this.fill = function (colour) {
            for (let r = 0; r < this.tetrominoOrientation.length; r++) {
                for (let c = 0; c < this.tetrominoOrientation.length; c++) {
                    // we draw only occupied squares
                    if (this.tetrominoOrientation[r][c]) {
                        screen.drawSquare(this.x + c, this.y + r, colour);
                    }
                }
            }
        };
    
        this.draw = function() {
            for (let r = 0; r < this.tetrominoOrientation.length; r++) {
                for (let c = 0; c < this.tetrominoOrientation[r].length; c++) { // Use the length of the current row
                    // we draw only occupied squares
                    if (this.tetrominoOrientation[r][c]) {
                        screen.drawSquare(this.x + c, this.y + r, this.colour);
                    }
                }
            }
        };
    
        this.unDraw = function() {
            this.fill(emptyCell);
        };
    
        this.moveDown = function(){
            if(!this.collision(0,1,this.tetrominoOrientation)){
                this.unDraw();
                this.y++;
                this.draw();
            }else{
                // we lock the piece and generate a new one
                this.lock();
                activePiece = newGame.randomPiece(); // Generate a new piece here
            }
        };
            
        this.moveRight = function() {
            if(!this.collision(1,0,this.tetrominoOrientation)){
                this.unDraw();
                this.x++;
                this.draw();
            }
        };
    
        this.moveLeft = function() {
            if(!this.collision(-1,0,this.tetrominoOrientation)){
                this.unDraw();
                this.x--;
                this.draw();
            }
        };
    
        this.rotate = function(){
            let nextPattern = this.tetromino[(this.rotation + 1)%this.tetromino.length];
            let kick = 0;
            
            if(nextPattern){ // Check if the next rotation exists
                if(this.collision(0, 0, nextPattern)){
                    if(this.x > columns/2){
                        // it's the right wall
                        kick = -1; // we need to move the piece to the left
                    }else{
                        // it's the left wall
                        kick = 1; // we need to move the piece to the right
                    }
                }
                
                if(!this.collision(kick, 0, nextPattern)){
                    this.unDraw();
                    this.x += kick;
                    this.rotation = (this.rotation + 1)%this.tetromino.length; // (0+1)%4 => 1
                    this.tetrominoOrientation = this.tetromino[this.rotation];
                    this.draw();
                }
            }
        }
    
        this.collision = function(x,y,piece){
            for(let r = 0; r < piece.length; r++){
                for(let c = 0; c < piece.length; c++){
                    // if the square is empty, we skip it
                    if(!piece[r][c]){
                        continue;
                    }
                    // coordinates of the piece after movement
                    let newX = this.x + c + x;
                    let newY = this.y + r + y;
                    
                    // conditions
                    if(newX < 0 || newX >= columns || newY >= rows){
                        return true;
                    }
                    // skip newY < 0; board[-1] will crush our game
                    if(newY < 0){
                        continue;
                    }
                    // check if there is a locked piece already in place
                    if(game.board[newY][newX] != emptyCell){
                        return true;
                    }
                }
            }
            return false;
        };
    
        function removeRow(r) {
            // remove the row r
            game.board.splice(r, 1);
        
            // add vacant row at the top
            game.board.unshift(Array(columns).fill(emptyCell));
        }
    
        this.lock = function(){
            for(let r = 0; r < this.tetrominoOrientation.length; r++){
                for(let c = 0; c < this.tetrominoOrientation.length; c++){
                    // we skip the vacant squares
                    if( !this.tetrominoOrientation[r][c]){
                        continue;
                    }
                    // pieces to lock on top = game over
                    if(this.y + r < 0){
                        alert("Game Over");
                        // stop request animation frame
                        gameOver = true;
                        break;
                    }
                    //lock the piece
                    game.board[this.y+r][this.x+c] = this.colour;
                }
            }
            // remove full rows
            let linesClearedThisTurn = 0;
            for(let r = 0; r < rows; r++){
                let isRowFull = true;
                for(let c = 0; c < columns; c++){
                    isRowFull = isRowFull && (game.board[r][c] != emptyCell);
                }
                if(isRowFull){
                    // if the row is full, we remove it
                    removeRow(r);
                    linesClearedThisTurn++;
                }
            }
        
            // update score
            if(linesClearedThisTurn === 4){
                if(lastTetris){
                    score += 1200;
                }else{
                    score += 800;
                    lastTetris = true;
                }
            }else{
                score += linesClearedThisTurn * 100;
                lastTetris = false;
            }
        
            // update the board
            screen.drawBoard();
        
            // update the score
            screen.scoreElement.textContent = score;
        
            // generate a new piece and draw it
            activePiece = newGame.randomPiece();
            activePiece.draw();
        }
        
        this.generateNewRandomPiece = function () {
            this.letter = getRandomPieceType();
            this.tetromino = tetrominoNames[this.letter];
            this.colour = tetrominoColors[this.letter];
            this.rotation = 0;
            this.tetrominoOrientation = this.tetromino[this.rotation];
            this.x = 3;
            this.y = -2;
            this.length = this.tetrominoOrientation.length;
        };
        
        this.isAtTop = function () {
        return this.y === -2;
    };
    }
};

function gameController() {

    const allPieces = {
        I : [tetrominoNames.I, tetrominoColors.I],
        J : [tetrominoNames.J, tetrominoColors.J],
        L : [tetrominoNames.L, tetrominoColors.L],
        O : [tetrominoNames.O, tetrominoColors.O],
        S : [tetrominoNames.S, tetrominoColors.S],
        Z : [tetrominoNames.Z, tetrominoColors.Z],
        T : [tetrominoNames.T, tetrominoColors.T]
    };
    
    let keys = Object.keys(allPieces)
    
    function randomPiece(){
        let r = Math.floor(Math.random() * keys.length) // 0 -> 6
        return new Piece(keys[r]);
    }
    
    let dropStart = Date.now();
    let gameOver = false;
    function drop(){
        let now = Date.now();
        let delta = now - dropStart;
        if(delta > 650){
            activePiece.moveDown();
            dropStart = Date.now();
        }
        if( !gameOver){
            requestAnimationFrame(drop);
        }
    }
    
    activePiece = randomPiece();
    drop();
    
    return {
        randomPiece,
        activePiece
    }
}
    
const newGame = gameController();

function InputHandler() {
    document.addEventListener("keydown", controls);

    function controls(event) {
        
        if (event.keyCode == 37) {
            activePiece.moveLeft();
            dropStart = Date.now();
        } else if (event.keyCode == 38) {
            activePiece.rotate();
            dropStart = Date.now();
        } else if (event.keyCode == 39) {
            activePiece.moveRight();
            dropStart = Date.now();
        } else if (event.keyCode == 40) {
            activePiece.moveDown();
            dropStart = Date.now();
        }
    }

    return {
        controls,
    };
}


const playerControls = InputHandler();