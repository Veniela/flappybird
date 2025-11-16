let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let velocityY = 0;
let gravity = 0.099;   
let jumpStrength = -3; 

let gameState = "RUNNING";

let pipeWidth = 64;
let pipeHeight = 512;
let pipes = [];

let pipeTopImg;
let pipeBottomImg;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  birdImg = new Image();
  birdImg.src = "./flappybird.png";

  pipeTopImg = new Image();
  pipeTopImg.src = "./toppipe.png";

  pipeBottomImg = new Image();
  pipeBottomImg.src = "./bottompipe.png";

  birdImg.onload = function () {
    context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
  };

  spawnPipe();

  requestAnimationFrame(update);
  document.addEventListener("keydown", handleInput);
  document.addEventListener("click", handleInput);
  document.addEventListener("contextmenu", restartGame);
};

function spawnPipe() {
  let gap = 150;
  let topHeight = Math.random() * (boardHeight - gap - 100) + 50;

  pipes.push({
    x: boardWidth,
    width: pipeWidth,
    topHeight: topHeight,
    gap: gap,
  });
}

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

    for (let i = 0; i < pipes.length; i++) {
      pipes[i].x -= 1;

      if (
        isColliding(
          { x: birdX, y: birdY, width: birdWidth, height: birdHeight },
          pipes[i]
        )
      ) {
        gameState = "GAME_OVER";
      }

      if (pipes[i].x + pipeWidth < 0) {
        pipes.splice(i, 1);
        i--;
      }
    }

    if (pipes.length === 0 || pipes[pipes.length - 1].x < boardWidth - 220) {
      spawnPipe();
    }
  }

  drawBird();
  drawPipes();
  drawGameState();
}

function drawBird() {
  context.drawImage(birdImg, birdX, birdY, birdWidth, birdHeight);
}

function drawPipes() {
  for (let pipe of pipes) {
    context.drawImage(
      pipeTopImg,
      pipe.x,
      pipe.topHeight - pipeHeight,
      pipeWidth,
      pipeHeight
    );

    context.drawImage(
      pipeBottomImg,
      pipe.x,
      pipe.topHeight + pipe.gap,
      pipeWidth,
      pipeHeight
    );
  }
}

function isColliding(bird, pipe) {
  let topPipe = {
    x: pipe.x,
    y: pipe.topHeight - pipeHeight,
    width: pipeWidth,
    height: pipeHeight,
  };

  let bottomPipe = {
    x: pipe.x,
    y: pipe.topHeight + pipe.gap,
    width: pipeWidth,
    height: pipeHeight,
  };

  if (
    bird.x < topPipe.x + topPipe.width &&
    bird.x + bird.width > topPipe.x &&
    bird.y < topPipe.y + topPipe.height
  ) {
    return true;
  }

  if (
    bird.x < bottomPipe.x + bottomPipe.width &&
    bird.x + bird.width > bottomPipe.x &&
    bird.y + bird.height > bottomPipe.y
  ) {
    return true;
  }

  return false;
}

function handleInput(e) {
  if (gameState !== "RUNNING") return;

  if (e.code === "Space" || e.code === "ArrowUp" || e.type === "click") {
    velocityY = jumpStrength;
  }
}

function drawGameState() {
  if (gameState === "GAME_OVER") {
    context.fillStyle = "black";
    context.font = "bold 46px Arial";

    let text1 = "GAME OVER";
    let text1Width = context.measureText(text1).width;

    context.fillText(
      text1,
      (boardWidth - text1Width) / 2,
      boardHeight / 2 - 20
    );

    context.font = "20px Arial";
    let text2 = "Right-click to restart";
    let text2Width = context.measureText(text2).width;

    context.fillText(
      text2,
      (boardWidth - text2Width) / 2,
      boardHeight / 2 + 20
    );
  }
}

function restartGame(e) {
  e.preventDefault();

  if (gameState === "GAME_OVER") {
    birdY = boardHeight / 2;
    velocityY = 0;
    pipes = [];
    spawnPipe();
    gameState = "RUNNING";
  }
}

document.addEventListener("keydown", function (e) {
  if (e.code === "KeyR" && gameState === "GAME_OVER") {
    birdY = boardHeight / 2;
    velocityY = 0;
    pipes = [];
    spawnPipe();
    gameState = "RUNNING";
  }
});
