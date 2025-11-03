//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;


let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

// let topPipeImg; 

// let velocityX = -2; 

let velocityY = 0; 
let gravity = 0.4;
let jumpStrength = -6;

let gameState = "RUNNING"; 

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); 

  //load bird image
  birdImg = new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
  };

  //pipe image 
//   topPipeImg = new Image();
//   topPipeImg.src = "./toppipe.png";
//   topPipeImg.onload = function () {
//     context.drawImage(topPipeImg, pipeX - pipeWidth, pipeY, pipeWidth, pipeHeight);
//   };
  

  requestAnimationFrame(update);
  document.addEventListener("keydown", handleInput);
  document.addEventListener("click", handleInput);
  document.addEventListener("contextmenu", restartGame); 
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  if (gameState === "RUNNING") {
    
    velocityY += gravity;
    birdY += velocityY;

    
    if (birdY < 0) {
      birdY = 0;
      velocityY = 0;
    }

    
    if (birdY + birdHeight > boardHeight) {
      birdY = boardHeight - birdHeight;
      gameState = "GAME_OVER";
    }

    // pipeX += velocityX; 
  }

  drawBird();

  drawGameState();
}

function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}


// function drawPipe() {
//   context.drawImage(topPipeImg, pipeX, pipeY, pipeWidth, pipeHeight);
// }


function handleInput(e) {
  if (gameState !== "RUNNING") return;

  if (e.code === "Space" || e.code === "ArrowUp" || e.type === "click") {
    velocityY = jumpStrength; // jump
  }
}

function drawGameState() {
  if (gameState === "GAME_OVER") {
    context.fillStyle = "red";
    context.font = "bold 32px Arial";
    context.fillText("GAME OVER", 80, boardHeight / 2);
    context.font = "16px Arial";
    context.fillText("Press R or Right-click to restart", 60, boardHeight / 2 + 40);
  }
}

function restartGame(e) {
  e.preventDefault(); 
  if (gameState === "GAME_OVER") {
    birdY = boardHeight / 2;
    velocityY = 0;
    gameState = "RUNNING";
  }
}

document.addEventListener("keydown", function (e) {
  if (e.code === "KeyR" && gameState === "GAME_OVER") {
    birdY = boardHeight / 2;
    velocityY = 0;
    gameState = "RUNNING";
  }
});
