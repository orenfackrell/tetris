/*
Gamebaord:
- create board
- clear rows & check they are filled

Pieces: 
- line, J, L, cube, S, Z, T shapes and position
- move left & right (not outside bounds)
- rotate 90deg
- 
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