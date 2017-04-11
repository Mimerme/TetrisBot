//Allows for expandability to other Tetris platforms
//BoardStart : 100 x 140
//BoardEnd : 500 x 860
const robot = require("robotjs");
const colors = require("colors");
const BOARD_HEIGHT = 720, BOARD_WIDTH = 400;
let BOARD_START_X = 0, BOARD_START_Y = 0;
const BIT_SIZE = 40;
const TILE_COUNT_X = Math.floor(BOARD_WIDTH / BIT_SIZE), TILE_COUNT_Y = Math.floor(BOARD_HEIGHT / BIT_SIZE);
let BOARD = new Array();
for (var y = 0; y < TILE_COUNT_Y; y++){
    BOARD[y] = new Array();
    for(var x = 0; x < TILE_COUNT_X; x++){
        BOARD[y][x] = "empty";
    }
}

console.log("Put mouse on board start for 5 seconds")
setTimeout(()=>{
     const mouse = robot.getMousePos();

    console.log("Mouse @ x: " + mouse.x + " y: " + mouse.y);
    
    BOARD_START_X = mouse.x;
    BOARD_START_Y = mouse.y;
    scan_loop();
}, 5000);

function scan_loop(){
    setTimeout(()=>{ 
        scan_entire_board();
        print_board();
        scan_loop();
    }, 500);
}

   if(BOARD_HEIGHT % BIT_SIZE != 0 || BOARD_WIDTH % BIT_SIZE != 0){
    console.log("Board dimensions are not exact, expect problems");
   }

function clear_board(){
     for(var k = 0; k < TILE_COUNT_Y; k++){
        for(var i = 0; i < TILE_COUNT_X; i++){
            BOARD[k][i] = "empty";
        }
   }   
}

function scan_entire_board(){
    for(var k = 0; k < TILE_COUNT_Y; k++){
        for(var i = 0; i < TILE_COUNT_X; i++){
            BOARD[k][i] = scan_bit_color(i, k);
        }
   }
}

function scan_bit_color(piece_x, piece_y){
    return robot.getPixelColor(BOARD_START_X + piece_x * BIT_SIZE + BIT_SIZE/2, BOARD_START_Y + piece_y * BIT_SIZE + BIT_SIZE/2);
}

function print_board(){
    console.clear();
    for(var k = 0; k < TILE_COUNT_Y; k++){
        for(var i = 0; i < TILE_COUNT_X; i++){
            if(BOARD[k][i] == "ffffff")
                process.stdout.write("d".white);
            else
                process.stdout.write("d".green);
        }
        console.log();
   }
}

//clears the screen. Only works on *NIX
console.clear = function(){
    return process.stdout.write('\033c');
}
