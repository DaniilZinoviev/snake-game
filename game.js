const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 1;
const cellSize = 15;
const totalWidth = 500;
const totalHeight = 300;

const gameSpeed = 250;

function Snake() {
  this.tiles = [
    {
      x: 2,
      y: 4
    }
  ];
  this.moveX = 1;
  this.moveY = 0;
}

function render(snake) {
  ctx.clearRect(0, 0, totalWidth, totalHeight);
  snake.tiles.forEach(tile => {
    ctx.fillRect(tile.x * cellSize, tile.y * cellSize, cellSize, cellSize);
  });
  console.log("run render");
}

function update(snake) {
  console.log('update');
  const lastTile = snake.tiles[snake.tiles.length - 1];
  const newTile = {
    x: lastTile.x + snake.moveX,
    y: lastTile.y + snake.moveY,
  }
  snake.tiles.push(newTile);
  snake.tiles.shift();
}

function gameTick(snake) {
  render(snake);
  update(snake);
}

function init() {
  const snake = new Snake();
  setInterval(function () { gameTick(snake); }, gameSpeed);
  gameTick(snake);
}

init();