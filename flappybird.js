//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; // width/height ratio = 17/12
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

//pipes
let pipeWidth = 64; // width/height ratio = 1/8
let pipeHeight = 320;
let pipeX = boardWidth - pipeWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    // context.fillStyle = "red";
    // context.fillRect(100, 300, 50, 50); // example

    //load images
    birdImg = new Image();
    birdImg.src = "/flappybird.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
    };
    // top p
    topPipeImg = new Image();
    topPipeImg.src = "/toppipe.png";
    topPipeImg.onload = function() {
        context.drawImage(topPipeImg, pipeX, pipeY, pipeWidth, pipeHeight);
    };

    // bottom p
    bottomPipeImg = new Image();
    bottomPipeImg.src = "/bottompipe.png";
    bottomPipeImg.onload = function() {
        let gap = 150; // distance bt pipes
        let bottomPipeY = pipeHeight + gap;
        context.drawImage(bottomPipeImg, pipeX, bottomPipeY, pipeWidth, pipeHeight);
    };
};
